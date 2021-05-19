const health = require('./health');
const inventory = require('./inventory');
const burialSite = require('./burial_sites');
const zones = require('./zones');
const sites = require('./sites');
const slots = require('./slots');
const user = require('./user');

module.exports = {
  inventory,
  health,
  burialSite,
  slots,
  zones,
  sites,
  user
};