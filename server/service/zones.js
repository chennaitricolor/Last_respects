const models = require('../models');
const { burialSites, Sequelize } = models;
const { exceptionparser } = require('../utils/validators');
class Zones {
  /**
   * @swagger
   * path:
   *   /zones:
   *     get:
   *       description: get all zones
   *       responses:
   *         200:
   *           description: zones.
   *       tags: ['Zones']
   */
  static list(req, res) {
    try {
      return burialSites.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('zone_or_division_id')), 'zone_or_division_id'], 'zone_or_division'] })
        .then(zones => res.status(200).send(zones));
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send({ error: message });
    }
  }
}

module.exports = Zones;
