module.exports = function (sequelize, DataTypes) {
  const inventory = sequelize.define('inventory', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    burialSiteId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'burial_sites',
        key: 'id'
      },
      field: 'burial_site_id'
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'item'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status'
    }
  }, {
    schema: process.env.DB_SCHEMA,
    tableName: 'inventory',
    timestamps: false
  });
  
  inventory.schema(process.env.DB_SCHEMA);
  return inventory;
};
