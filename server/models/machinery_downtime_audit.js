const _ = require('lodash');
const { SITE_STATUS } = require('../constant/enum');

module.exports = function (sequelize, DataTypes) {
  const machinery_downtime_audit = sequelize.define('machineryDowntimeAudit', {
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
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      field: 'status',
      values: _.values(SITE_STATUS)
    },
    statusStartTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'status_start_time'
    },
    statusEndTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'status_end_time'
    }
  }, {
    schema: process.env.DB_SCHEMA,
    tableName: 'machinery_downtime_audit',
    timestamps: false
  });
  return machinery_downtime_audit;
};
