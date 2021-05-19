const models = require('../models');
const { burialSites } = models;
const _ = require('lodash');
const { SITE_STATUS } = require('../constant/enum');
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
  static list(req, res) {
    try {
      return burialSites.findAll().then(items => res.status(200).send(items));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static async isSiteAvailable(siteId, options) {
    const site = burialSites.findByPk(siteId, options);
    if (_.isEmpty(site) || site.status !== SITE_STATUS.AVAILABLE) {
      return { isSiteAvailable: false, site };
    } else {
      return { isSiteAvailable: true, site };
    }
  }
}
// *       parameters:
// *         - in: header
// *           name: x-access-token
// *           required: true

module.exports = BurialSites;

/**
 * @swagger
 *
 * definitions:
 *   Inventory:
 *     type: object
 *     required:
 *       - details
 *     properties:
 *       details:
 *         type: json
 *   modifyItems:
 *     properties:
 *       iventoryId:
 *          type: integer
 *       details:
 *          type: json
 */