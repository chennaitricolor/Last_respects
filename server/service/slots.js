const models = require('../models');
const { slots, slotMeta, burialSites, Sequelize } = models;
const moment = require('moment-timezone');
const { DATE_RANGE, SLOT_NOT_FOUND, SLOT_UNAVAILABLE, BAD_REQUEST, expectedSlotKeys, SLOT_ACCESS_DENIED, SITE_NOT_FOUND, blockedSlots, BOOKING_EXISTS } = require('../constant/constants');
const { SLOT_STATUS, SLOT_UPDATE_TYPE, SLOT_TYPE_STATUS_MAP } = require('../constant/enum');
const { constructSlots, validateStateTransition, getTimeField, getBookingId } = require('../utils/helpers');
const { slots: slotsValidator, validate, exceptionparser } = require('../utils/validators');
const BurialSitesService = require('./burial_sites');
const UserService = require('./user');
const _ = require('lodash');
const { sequelize } = require('../models');
const BurialSites = require('./burial_sites');

class Slots {
  /**
   * @swagger
   * path:
   *   /sites/:siteId/slots:
   *     get:
   *       description: get all available slots for the site
   *       responses:
   *         200:
   *           description: slot details.
   *       tags: ['slots']
   */
  static async list(req, res) {
    try {
      const constructSLotMetaDateWhere = (slotMetaDates, date) => {
        slotMetaDates.push({
          validTill: {
            [Sequelize.Op.gte]: date
          }
        });
        slotMetaDates.push({
          validFrom: {
            [Sequelize.Op.lte]: date
          }
        });
        return slotMetaDates;
      }
      const currentDate = moment();
      const previousDate = moment(currentDate).subtract(1, 'd');
      const endDate = moment(currentDate).add(DATE_RANGE.VALUE, DATE_RANGE.UNIT || 'd');
      let days = DATE_RANGE.VALUE || 4;
      const siteId = _.get(req, 'params.siteId');
      const dateFilter = _.get(req, 'query.date');
      const momentDateFilter = moment(dateFilter);
      const onlyFreeSlots = _.get(req, 'query.onlyFreeSlots') === 'true';
      validate(slotsValidator.list({ siteId }));
      const site = await burialSites.findByPk(siteId);
      if(_.isEmpty(site)) {
        throw SITE_NOT_FOUND;
      }

      const slotMetaDates = [];
      const dates = [];
      if(!_.isEmpty(dateFilter) && momentDateFilter.isValid()){
        dates.push(momentDateFilter);
        constructSLotMetaDateWhere(slotMetaDates, momentDateFilter);
      } else {
        let date = moment(currentDate).subtract(2, 'd');
        while (days--) {
          date.add(1, 'd');
          dates.push(moment(date));
          constructSLotMetaDateWhere(slotMetaDates, date);
        }
      }

      const slotMetaWhere = {
        [Sequelize.Op.and]: [
          { burialSiteId: parseInt(siteId) },
          { [Sequelize.Op.or]: slotMetaDates }
        ]
      };
      const slotDetails = await slotMeta.findAll({ where: slotMetaWhere });
      const bookedSlotsWhere = {
        [Sequelize.Op.and]: [
          {
            dateOfCremation: {
              [Sequelize.Op.between]: [previousDate, endDate]
            }
          },
          {
            burialSiteId: siteId
          },
          // { status: {[Sequelize.Op.notIn] : [SLOT_STATUS.CANCELLED, SLOT_STATUS.NOSHOW, ]} }
        ]

      };
      const bookedSlotsAttributes = [
        'id',
        'slot',
        'dateOfCremation',
        'status'
      ];
      const bookedSlots = await slots.findAll({ where: bookedSlotsWhere, attributes: bookedSlotsAttributes });
      const result = constructSlots(slotDetails, bookedSlots, dates, onlyFreeSlots);
      res.status(200).send(result);
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }

  static async get(req, res) {
    const { slotId } = req.params;
    try {
      if (slotId) {
        const slotDetails = await slots.findByPk(slotId);
        if (_.isEmpty(slotDetails)) {
          throw SLOT_NOT_FOUND;
        }
        res.status(200).send(slotDetails)
      } else {
        res.status(400).send(BAD_REQUEST)
      }
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }

  }
  /**
 * @swagger
 * path:
 *   /slots/:slotId:
 *     put:
 *       description: update slot status
 *       responses:
 *         200:
 *           description: updated.
 *       tags: ['Slots']
 */
  static async update(req, res) {
    try {
      const slotId = _.get(req, 'params.slotId');
      const slotDetailsParam = _.get(req, 'body.slotDetails');
      const reason = _.get(req, 'body.reason');
      const updatedTime = _.get(req, 'body.updatedTime');
      const type = _.get(req, 'body.type');
      const userId = req.userId;
      validate(slotsValidator.update({ slotId, slotDetails: slotDetailsParam, reason, type, updatedTime }));
      const slotDetails = await slots.findByPk(slotId);
      if (_.isEmpty(slotDetails)) {
        throw SLOT_NOT_FOUND;
      }
      const toBeUpdatedStatus = SLOT_TYPE_STATUS_MAP[type];
      if ([SLOT_UPDATE_TYPE.COMPLETE, SLOT_STATUS.ARRIVED, SLOT_STATUS.STARTED, SLOT_STATUS.NOSHOW ].includes(type)) {
        await Slots.dbUpdateSlotData(slotDetails, userId, { status: toBeUpdatedStatus, statusUpdatedTime: updatedTime })
      } else if (type === SLOT_UPDATE_TYPE.CANCEL) {
        await Slots.dbUpdateSlotData(slotDetails, userId, { status: toBeUpdatedStatus, reasonForCancellation: reason })
      } else if (type === SLOT_UPDATE_TYPE.REASSIGN) {
        await sequelize.transaction(async function(transaction) {
          const options = { transaction, lock: transaction.LOCK.UPDATE };
          const overrideOptions = { previouslyBookedId: slotDetails.id}
          const newSlotDetails = { ..._.omit(slotDetails.toJSON(), ['id']), ...slotDetailsParam }
          await Slots.bookSlot(newSlotDetails, userId, true, options, overrideOptions);
          await Slots.dbUpdateSlotData(slotDetails, userId, { status: toBeUpdatedStatus, reasonForCancellation: reason }, options)
        });
      }
      res.status(200).send({ slotId });

    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }

  static async insert(req, res) {
    let { slotDetails } = req.body;
    try {
      validate(slotsValidator.insert({ slotDetails }));
      slotDetails = _.pick(slotDetails, expectedSlotKeys);
      const bookedSlot = await Slots.bookSlot(slotDetails, req.userId, false);
      return res.status(200).send({ slotId: bookedSlot.id })
  } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }

  static async dbUpdateSlotData(slot, userId, update = {}, options) {
    if (!_.isEmpty(update.status)) {
      validateStateTransition(slot.status, update.status);
    }
    const currentDate = moment()
    update.updatedTime = currentDate
    update.updatedBy = userId
    const relatedTimeField = getTimeField(update.status);
    if(relatedTimeField) {
      const updatedTime = moment(update.statusUpdatedTime);
      update[relatedTimeField] = updatedTime
      delete update.updatedTime;
    }
    await slot.update(update, { where: { id: slot.id, ...options } });
  }



  static async authorizeBooking(slotDetailsParam, userId, crossBookOverride) {
    const authorizedSites = await BurialSitesService.dbGetAuthorizedSites(userId);
    let canCrossBook = false;
    const inAuthorizedList = !_.isEmpty(_.find(authorizedSites, (authorizedSite) => parseInt(authorizedSite.id) === slotDetailsParam.burialSiteId));
    if(crossBookOverride && !inAuthorizedList) {
      canCrossBook = await UserService.isMachineMeltDown(userId, { authorizedSites })
    }
    const isAuthorized = inAuthorizedList || canCrossBook;
    if(!isAuthorized) {
      throw  SLOT_ACCESS_DENIED;
    }
  }

  static async bookSlot(slotDetailsParam, userId, crossBookOverride, options = {}, overrideOptions) {
    await Slots.authorizeBooking(slotDetailsParam, userId, crossBookOverride)
    const currentDate = moment()
    slotDetailsParam.createdTime = currentDate;
    slotDetailsParam.updatedTime = currentDate;
    slotDetailsParam.createdBy = userId;
    slotDetailsParam.updatedBy = userId;
    slotDetailsParam.status = SLOT_STATUS.BOOKED;
    if (_.isEmpty(options.transaction)) {
      return await sequelize.transaction(async transaction => {
        const options = { transaction, lock: transaction.LOCK.UPDATE };
        return await Slots.dBbookSlot(slotDetailsParam, options, overrideOptions);
      })
    } else {
      return await Slots.dBbookSlot(slotDetailsParam, { lock: options.transaction.LOCK.UPDATE, ...options }, overrideOptions)
    }
  }

  static async dBbookSlot(slotDetailsParam, options = {}, overrideOptions={}) {
    const [isAlreadyBooked, slotDetails = {}] = await Slots.isAlreadyBooked(slotDetailsParam, options);
    if(isAlreadyBooked) {
      if(slotDetails.id !== overrideOptions.previouslyBookedId) {
        const site = await BurialSites.getSiteFromId(slotDetails.burialSiteId, options);
        throw {
          ...BOOKING_EXISTS,
          bookingId: slotDetails.bookingId,
          dateOfCremation: slotDetails.dateOfCremation,
          slot: slotDetails.slot,
          site: _.pick(site.toJSON(), ['contactNo', 'zoneOrDivisionId', 'siteName', 'zoneOrDivision', 'address', 'city', 'id'])
        }
      }
    }
    const isSlotAvailable = await Slots.isSlotAvailable(slotDetailsParam.burialSiteId, slotDetailsParam.slot, slotDetailsParam.dateOfCremation, options);
    if (isSlotAvailable) {
      slotDetailsParam.bookingId = slotDetailsParam.bookingId || getBookingId() 
      const slotRecord = await slots.create(slotDetailsParam, options);
      return slotRecord
    } else {
      throw SLOT_UNAVAILABLE
    }
  }

  static async isAlreadyBooked({ aadharOfDeceased }, options) {
    if(_.isEmpty(aadharOfDeceased)) {
      return [ false ]
    }
    const slotWhere = { aadharOfDeceased, status: { [Sequelize.Op.in]: blockedSlots } }
    const slotDetails = await slots.findOne({ where: slotWhere, ...options })
    return [!_.isEmpty(slotDetails), slotDetails];
  }

  static async isSlotAvailable(siteId, slot, date, options) {
    const { isSiteAvailable } = await BurialSitesService.isSiteAvailable(siteId, options);
    if (isSiteAvailable) {
      const slotMetaWhere = { burialSiteId: siteId, slot }
      const slotConfigured = await slotMeta.findOne({ where: slotMetaWhere });
      if(_.isEmpty(slotConfigured)) {
        return false;
      } 
      const slotWhere = { burialSiteId: siteId, slot, dateOfCremation: date, status: { [Sequelize.Op.in]: blockedSlots } }
      const slotDetails = await slots.findOne({ where: slotWhere, ...options })
      return _.isEmpty(slotDetails);
    } else {
      return false
    }

  }

}

module.exports = Slots;