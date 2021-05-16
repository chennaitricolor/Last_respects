const {
    health, inventory, burialSite, slots
  } = require('../service');
  
  
  exports.bind = (app) => {
    console.log("health",health)
    app.use('/health', health);

    app.get('/inventory', inventory.list);

    app.get('/burialSite', burialSite.list);

    app.get('/sites/:siteId/slots', slots.list);

    app.put('/slots/:slotId', slots.update);

  };