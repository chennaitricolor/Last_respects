const models = require('../models');
const {burial_sites} = models;

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
      return burial_sites.findAll().then(items => res.status(200).send(items));
    } catch (e) {
      res.status(500).send({ error: e.message });
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