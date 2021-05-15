var DataTypes = require("sequelize").DataTypes;
var _burial_sites = require("./burial_sites");

function initModels(sequelize) {
  var burial_sites = _burial_sites(sequelize, DataTypes);


  return {
    burial_sites,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
