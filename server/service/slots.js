const models = require('../models');
const { slots, slotMeta, Sequelize } = models;
const moment = require('moment-timezone');
const { DATE_RANGE, SLOT_NOT_FOUND } = require('../constant/constants');
const { SLOT_STATUS, SLOT_UPDATE_TYPE } = require('../constant/enum');
const { constructSlots, validateStateTransition } = require('../utils/helpers');
const { slots: slotsValidator, validate, exceptionparser } = require('../utils/validators');
const _ = require('lodash');

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
      const startDate = moment();
      const endDate = startDate.add(DATE_RANGE.VALUE, DATE_RANGE.UNIT | 'd');
      let days = DATE_RANGE.VALUE | 4;
      const siteId = _.get(req, 'params.siteId');
      validate(slotsValidator.list({ siteId }));
      const slotMetaDates = [];
      const dates = [];
      let date = startDate.subtract(1, 'd');
      while (days--) {
        date = date.add(1, 'd');
        dates.push(date);
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
      }
      const slotMetaWhere = { 
        [Sequelize.Op.and] : [
          { burialSiteId: siteId },
          { [Sequelize.Op.or]: slotMetaDates }
        ]
      };
      const slotDetails = await slotMeta.findAll({ where: slotMetaWhere });
      const bookedSlotsWhere = {
        [Sequelize.Op.and] : [
          { dateOfCremation: {
            [Sequelize.Op.between]: [startDate, endDate]
          } },
          { status: SLOT_STATUS.BOOKED }
        ]

      };
      const bookedSlotsAttributes = [
        'id',
        'slot',
        'dateOfCremation',
        'status'
      ];
      const bookedSlots = await slots.findAll({ where: bookedSlotsWhere, attributes: bookedSlotsAttributes});
      return constructSlots(slotDetails, bookedSlots, dates);
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send({ error: message });
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
        const slotDetailsParam = _.get(req, 'body.slot_details');
        const reason = _.get(req, 'body.reason');
        const type = _.get(req, 'body.type');
        validate(slotsValidator.update({ slotId, slotDetails: slotDetailsParam, reason, type }));
        const slotDetails = slots.findByPk(slotId);
        if(_.isEmpty(slotDetails)) {
          throw {
            errors: [SLOT_NOT_FOUND]
          };
        }
        if(reason === SLOT_UPDATE_TYPE.COMPLETE) {
          await this.dbUpdateSlotData(slotDetails, { status: SLOT_STATUS.COMPLETED})
        } else if(reason === SLOT_UPDATE_TYPE.CANCEL) {
          await this.dbUpdateSlotData(slotDetails, { status: SLOT_STATUS.CANCELLED, reasonForCancellation: reason})
        } else if (reason === SLOT_UPDATE_TYPE.REASSIGN) {
          //TODO implement REASSIGN
        }

      } catch (e) {
        const { code, message } = exceptionparser(e);
        res.status(code).send({ error: message });
      }
    }

    static async dbUpdateSlotData(slot, update = {}, options) {
      if(!_.isEmpty(update.status)) {
        validateStateTransition(slot.status, update.status);
      }
      await slot.update(update, { where: { id: slot.id, ...options }});
    }

}

module.exports = Slots;