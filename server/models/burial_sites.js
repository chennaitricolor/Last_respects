module.exports = function(sequelize, DataTypes) {
  const burial_sites =  sequelize.define('burialSites', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status'
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
    tableName: 'burial_sites',
    timestamps:false
  });
  return burial_sites;
};
