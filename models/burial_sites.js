const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('burial_sites', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    long: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    zone: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    machinery_status: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'burial_sites',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "burial_sites_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
