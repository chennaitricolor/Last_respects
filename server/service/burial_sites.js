const models = require('../models');
const { burialSites } = models;
const _ = require('lodash');
const { SITE_NOT_FOUND, SITE_ACCESS_DENIED } = require('../constant/constants');
const { exceptionparser, validate, burialSites: burialSitesValidator } = require('../utils/validators');
const { sequelize } = require('../models');
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
        ]
        const sites = await burialSites.findAll({ where: findSitesWhere, attributes: findSitesAttributes });
        const result = sites.map(({ owner, isActive, id, siteName, status }) => {
          return {
            isOwner: parseInt(owner) === req.userId,
            isActive,
            siteName,
            id,
          }
        })
        return res.status(200).send(result);
      } else {
        res.status(400).send(SITE_NOT_FOUND)
      }
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send({ error: message });
    }
  }

  static async isSiteAvailable(siteId, options) {
    const site = await burialSites.findByPk(siteId, options);
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
      res.status(code).send({ error: message });
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
          site.update({ status }, {id: parseInt(siteId), ...options});

        } else {
          throw SITE_ACCESS_DENIED;
        }
      })
      return res.status(200).send({ id: siteId }); ;
    } catch(e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send({ error: message });
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
