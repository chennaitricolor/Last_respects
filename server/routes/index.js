const {
    health, inventory, burialSite
  } = require('../service');
  
  
  exports.bind = (app) => {
    console.log("health",health)
    app.use('/health', health);
    // app.post('/inventory/create', inventory.create); // API for creating new inventory item
    // app.put('/inventory/:id', inventory.modify);
    // app.delete('/inventory/:id', inventory.delete);
    // app.get('/inventory/:id', inventory.getInventoryDetailsById);
    app.get('/inventory', inventory.list);

    app.get('/burialSite',burialSite.list);

    // items
    // app.post('/seller/:sellerId/items', verifyToken, Items.create);
    // app.get('/items', verifyToken, Items.list);
    // app.get('/seller/:sellerId/items', Items.getItemBySellerId); // TODO: [STYLE] Can this be changed to only a filter (query param) on the index call?
    // app.get('/items/:itemId', verifyToken, Items.getItemById);
    // app.put('/items/:itemId', verifyToken, Items.modify);
    // app.delete('/items/:itemId', verifyToken, Items.delete);
  
    // // bids
    // app.post('/buyer/:buyerId/bids', verifyToken, verifyBuyer, getSeller, Bids.create);
    // app.get('/bids', verifyToken, Bids.list);
    // app.get('/buyer/:buyerId/bids', verifyToken, Bids.getItemByBuyerId); // TODO: [STYLE] Can this be changed to only a filter (query param) on the index call?
    // app.get('/bids/:bidId', verifyToken, Bids.getBidById);
    // app.put('/bids/:bidId', verifyToken, verifyBid, Bids.modify);
    // app.delete('/bids/:bidId', verifyToken, verifyBid, Bids.delete);
  };