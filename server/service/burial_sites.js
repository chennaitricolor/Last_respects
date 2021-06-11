const models = require('../models');
const { burialSites, machineryDowntimeAudit, Sequelize, sequelize } = models;
const _ = require('lodash');
const { SITE_NOT_FOUND, SITE_ACCESS_DENIED } = require('../constant/constants');
const { exceptionparser, validate, burialSites: burialSitesValidator } = require('../utils/validators');
const moment = require('moment-timezone');
class BurialSites {
  /**
   * @swagger
   * path:
   *   /burialSite:
   *     get:
   *       description: get all Burial ground details
   *       responses:
   *         200:
   *           description: Burial Site details.
   *       tags: ['BurialSites']
   */
   static async list(req, res) {
    try {
      const { zoneId } = req.params
      if (zoneId) {
        const findSitesWhere = {
          zoneOrDivisionId: zoneId 
        };
        const findSitesAttributes = [
          'id',
          'siteName',
          'status',
          'isActive',
          'owner',
          'address',
          'contactNo',
          'city'
        ]
        const sites = await burialSites.findAll({ where: findSitesWhere, attributes: findSitesAttributes });
        const result = sites.map(({ owner, isActive, id, siteName, address, contactNo, city }) => {
          return {
            isOwner: parseInt(owner) === req.userId,
            isActive,
            siteName,
            id,
            address,
            contactNo,
            city
          }
        })
        return res.status(200).send(result);
      } else {
        res.status(400).send(SITE_NOT_FOUND)
      }
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }

  static async getSiteFromId (siteId, options = {}) {
    const site = await burialSites.findByPk(siteId, options);
    return site;
  }

  static async isSiteAvailable(siteId, options) {
    const site = await BurialSites.getSiteFromId(siteId, options);
    if (_.isEmpty(site) || !site.isActive) {
      return { isSiteAvailable: false, site };
    } else {
      return { isSiteAvailable: true, site };
    }
  }

  static async getAuthorizedSites(req, res) {
    try {
      const sites = await BurialSites.dbGetAuthorizedSites(req.userId);
      return res.status(200).send(sites);
    } catch(e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }

  static async getIncidents(req, res) {
    try {
      const siteId = req.params.siteId
      const machineryDowntimeWhere = {
        burialSiteId: siteId,
      }
      const attributes = {
        exclude: ['id', 'burialSiteId'],
      }
      const order = [['statusStartTime', 'DESC']];
      const limit = 5;
      const machineryDowntimeAuditCurrentRecords = await machineryDowntimeAudit.findAll({ where: machineryDowntimeWhere, attributes, order, limit  });
      return res.status(200).send(machineryDowntimeAuditCurrentRecords);
    } catch(e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }

  }

  static async updateSiteStatus(req, res) {
    try {
      const siteId = _.get(req, 'params.siteId');
      const status = _.get(req, 'body.status');
      validate(burialSitesValidator.update({ siteId, status }));
      const site = await burialSites.findByPk(siteId);
      await sequelize.transaction(async transaction => {
        const options = { transaction, lock: transaction.LOCK.UPDATE };
        if(!_.isEmpty(site) && parseInt(site.owner) === req.userId) {
          await site.update({ status }, {id: parseInt(siteId), ...options});
          const machineryDowntimeWhere = {
            [Sequelize.Op.and]: [
              { burialSiteId: parseInt(siteId) },
              { statusEndTime: {
                [Sequelize.Op.is]: null
              } }
            ]
          }
          const currentTime = moment();
          const machineryDowntimeAuditCurrentRecords = await machineryDowntimeAudit.findAll({ where: machineryDowntimeWhere  });
          if(!_.isEmpty(machineryDowntimeAuditCurrentRecords)) {
            for(const machineryDowntimeAuditCurrentRecord of machineryDowntimeAuditCurrentRecords) {
              await machineryDowntimeAuditCurrentRecord.update({ statusEndTime: currentTime }, {
                id: parseInt(machineryDowntimeAuditCurrentRecord.id),
                ...options
              });
            }
          }
          const machineryDowntimeAuditRecord = {
            burialSiteId: siteId,
            status,
            statusStartTime: currentTime
          }
          await machineryDowntimeAudit.create(machineryDowntimeAuditRecord, options)
          return res.status(200).send({ id: siteId }); ;
        } else {
          throw SITE_ACCESS_DENIED;
        }
      })
    } catch(e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }

  }

  static async dbGetAuthorizedSites(userId, options = {}) {
    const authorizedSitesWhere = {
      owner: userId 
    };
    const authorizedSitesAttributes = [
      'id',
      'status',
      'isActive'
    ]
    const sites = await burialSites.findAll({ where: authorizedSitesWhere, attributes: authorizedSitesAttributes, ...options });
    return sites;
  }
}

module.exports = BurialSites;
