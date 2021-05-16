module.exports = function(sequelize, DataTypes) {
  const inventory =  sequelize.define('inventory', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    burial_site_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'burial_sites',
        key: 'id'
      }
    },
    item: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'inventory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inventory_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return inventory;
};
