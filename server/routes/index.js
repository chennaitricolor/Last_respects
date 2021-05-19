const {
    health, inventory, burialSite, slots, zones, sites
  } = require('../service');
  
  
  exports.bind = (app) => {
    console.log("health",health)
    app.use('/health', health);

    app.get('/inventory', inventory.list);

    app.get('/burialSite', burialSite.list);

    app.get('/sites/:siteId/slots', slots.list);

    app.put('/slots/:slotId', slots.update);

    app.get('/slots/:slotId', slots.get)

    app.get('/zones', zones.list)

    app.get('/zones/:zoneId/sites', sites.list)

  };