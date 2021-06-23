const health = require('./health');
const inventory = require('./inventory');
const burialSite = require('./burial_sites');
const zones = require('./zones');
const slots = require('./slots');
const user = require('./user');
const dashboard = require('./dashboard')

module.exports = {
  inventory,
  health,
  burialSite,
  slots,
  zones,
  user,
  dashboard
};