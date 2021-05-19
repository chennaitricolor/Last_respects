const models = require('../models');
const {burialSites} = models;
const {exceptionparser } = require('../utils/validators');
const { SITE_NOT_FOUND } = require('../constant/constants');
class Sites {
    /**
     * @swagger
     * path:
     *   /zones/:zoneId/sites:
     *     get:
     *       description: get all sites
     *       responses:
     *         200:
     *           description: zones.
     *       tags: ['Sites']
     */
    static list(req, res) {
        try {
            const {zoneId} = req.params
            if (zoneId) {
                return burialSites.findAll( { where: {zoneOrDivisionId: zoneId}, attributes: ['id', 'site_name']})
                    .then(sites => res.status(200).send(sites));
            } else {
                res.status(400).send(SITE_NOT_FOUND)
            }
        } catch (e) {
            const { code, message } = exceptionparser(e);
            res.status(code).send({ error: message });
        }
    }
}

module.exports = Sites;
