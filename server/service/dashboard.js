const {getDashboard} =  require('../utils/aws-connecter')

class Dashboard {
    /**
     * @swagger
     * path:
     *   /dashboard:
     *     get:
     *       description: get dashboard url
     *       responses:
     *         200:
     *           description: dashboard details.
     *       tags: ['Dashboard']
     */
    static async get(req, res) {
        try {
            const dashboard = await getDashboard();
            if (!dashboard) {
                return res.status(401).send({
                    success: false
                });
            }
            return res.send({
                success: true,
                dashboard,
            });
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    }
}
// *       parameters:
// *         - in: header
// *           name: x-access-token
// *           required: true

module.exports = Dashboard;