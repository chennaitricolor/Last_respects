/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const slot_meta =  sequelize.define('slotMeta', {
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
      field: 'slot'
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
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    }
  }, {
    tableName: 'slot_meta'
  });
  return slot_meta;
};
