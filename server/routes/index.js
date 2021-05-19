const router = require('express').Router();

const {
  health, inventory, burialSite, slots, zones, sites, user
} = require('../service');


const verifyToken = require('../utils/verifyToken');

router.get('/health', health);
router.get('/inventory', inventory.list);
router.get('/burialSite', burialSite.list);

router.post('/slots', verifyToken, slots.insert);
router.get('/slots/:slotId', verifyToken, slots.get)
router.put('/slots/:slotId', verifyToken, slots.update);

router.get('/zones', verifyToken, zones.list)
router.get('/zones/:zoneId/sites', verifyToken, sites.list)
router.get('/sites/:siteId/slots', verifyToken, slots.list);

router.post('/users/register', user.create); // API route for user to signup
router.post('/users/login', user.login);
router.put('/users/:id', verifyToken, user.modify); // API route for user to edit a detail
router.delete('/users/:id', verifyToken, user.delete);
router.get('/users', verifyToken, user.list);

module.exports = router