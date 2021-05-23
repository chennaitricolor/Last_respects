/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const slot_meta = sequelize.define('slotMeta', {
    burialSiteId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'burial_sites',
        key: 'id'
      },
      field: 'burial_site_id'
    },
    slot: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'slot',
      validate: {
        is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      }
    },
    validFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'valid_from'
    },
    validTill: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'valid_till'
    },
    slotOrder: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'slot_order'
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    }
  }, {
    schema: process.env.DB_SCHEMA,
    tableName: 'slot_meta',
    timestamps: false
  });
  return slot_meta;
};
