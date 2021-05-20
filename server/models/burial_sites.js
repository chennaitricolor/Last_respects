const _ = require('lodash');
const { SITE_STATUS } = require('../constant/enum');

module.exports = function (sequelize, DataTypes) {
  const burial_sites = sequelize.define('burialSites', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'lat'
    },
    long: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'long'
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      field: 'status',
      values: _.values(SITE_STATUS)
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'city'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address'
    },
    zoneOrDivision: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'zone_or_division'
    },
    zoneOrDivisionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'zone_or_division_id'
    },
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'site_name'
    },
    contactNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'contact_no'
    },
    adminType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'admin_type'
    },
    siteType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'site_type'
    }
  }, {
    schema: process.env.DB_SCHEMA,
    tableName: 'burial_sites',
    timestamps: false
  });
  burial_sites.schema(process.env.DB_SCHEMA);
  return burial_sites;
};
