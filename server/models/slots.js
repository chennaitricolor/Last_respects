/* jshint indent: 2 */
const _ = require('lodash');
const { SLOT_STATUS } = require('../constant/enum');

module.exports = function(sequelize, DataTypes) {
  const slots =  sequelize.define('slots', {
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
      values: _.keys(SLOT_STATUS)
    },
    covidRelated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'covid_related'
    },
    attenderName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'attender_name'
    },
    attenderContact: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'attender_contact'
    },
    reasonForCancellation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'reason_for_cancellation'
    },
    dateOfCremation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'date_of_cremation'
    },
    deceasedName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'deceased_name'
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'updated_by'
    },
    deathCertNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'death_cert_no'
    },
    proofType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'proof_type'
    },
    proofId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'proof_id'
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_time'
    },
    slot: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'slot',
      validate: {
        is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      }
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    }
  }, {
    tableName: 'slots'
  });
  return slots;
};
