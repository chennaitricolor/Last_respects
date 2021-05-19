const {
    health, inventory, burialSite, slots, zones, sites, user
  } = require('../service');


const verifyToken = require('../utils/verifyToken');

exports.bind = (app) => {
  console.log("health", health)
  app.use('/health', health);

  app.get('/inventory', inventory.list);

  app.get('/burialSite', burialSite.list);

  app.get('/slots/:slotId', verifyToken, slots.get)

  app.get('/sites/:siteId/slots', verifyToken, slots.list);

  app.put('/slots/:slotId', verifyToken,  slots.update);

  app.get('/zones', zones.list)

  app.get('/zones/:zoneId/sites', sites.list)

  //users

  app.post('/users/register', user.create); // API route for user to signup
  app.post('/users/login', user.login);
  app.put('/users/:id', verifyToken, user.modify); // API route for user to edit a detail
  app.delete('/users/:id', verifyToken, user.delete);
  app.get('/users', user.list);

};