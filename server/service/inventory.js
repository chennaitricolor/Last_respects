const models = require('../models');
const {inventory} = models;

class Inventory {
  /**
   * @swagger
   * path:
   *   /inventory:
   *     get:
   *       description: get all items
   *       responses:
   *         200:
   *           description: item details.
   *       tags: ['Inventory']
   */
  static list(req, res) {
    try {
      return inventory.findAll().then(items => res.status(200).send(items));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}
// *       parameters:
// *         - in: header
// *           name: x-access-token
// *           required: true

module.exports = Inventory;

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