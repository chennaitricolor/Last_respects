const router = require('express').Router();

const {
  health, inventory, burialSite, slots, zones, user
} = require('../service');

const { verifyToken, verifySuperUser } = require('../utils/verifyToken');

router.get('/health', health);
// router.get('/inventory', inventory.list);

router.post('/slots', verifyToken, slots.insert);
router.get('/slots/:slotId', verifyToken, slots.get)
router.put('/slots/:slotId', verifyToken, slots.update);

router.get('/zones', verifyToken, zones.list)
router.get('/zones/:zoneId/sites', verifyToken, burialSite.list)
router.get('/sites/:siteId/slots', verifyToken, slots.list);
router.put('/sites/:siteId', verifyToken, burialSite.updateSiteStatus);
router.get('/sites', verifyToken, burialSite.getAuthorizedSites);

router.post('/users/register', verifyToken, verifySuperUser, user.create); // API route for user to signup
router.post('/users/login', user.login);
router.put('/users/:id', verifyToken, verifySuperUser, user.modify); // API route for user to edit a detail
router.delete('/users/:id', verifyToken, verifySuperUser, user.delete);
router.get('/users', verifyToken, verifySuperUser, user.list);

module.exports = router