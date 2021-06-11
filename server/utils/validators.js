const _ = require('lodash');
const { expectedSlotKeys, optionalKeys, USERNAME_AND_PASSWORD_REQUIRED } = require('../constant/constants');
const { SLOT_UPDATE_TYPE, SITE_STATUS } = require('../constant/enum');
const moment = require('moment-timezone');

module.exports = {
  slots: {
    update: ({ slotId, slotDetails = {}, reason, type, updatedTime }) => {
      const errors = [];
      const updateTypes = _.values(SLOT_UPDATE_TYPE);
      if (_.isEmpty(slotId)) {
        errors.push({ message: 'slotId missing' });
      }
      if (_.includes(updateTypes, type)) {
        if([SLOT_UPDATE_TYPE.ARRIVED, SLOT_UPDATE_TYPE.STARTED, SLOT_UPDATE_TYPE.COMPLETE].includes(type)) {
          if(_.isEmpty(updatedTime)) {
            errors.push({ message: 'updatedTime missing' });
          } else {
            if(!moment(updatedTime).isValid()) {
              errors.push({ message: 'updatedTime should be an iso time string' });
            }
          }
        } else if ((type === SLOT_UPDATE_TYPE.CANCEL || type === SLOT_UPDATE_TYPE.REASSIGN) && _.isEmpty(reason)) {
          errors.push({ message: 'reason missing' });
        } else if (type === SLOT_UPDATE_TYPE.REASSIGN) {
          const { dateOfCremation, slot, burialSiteId } = slotDetails;
          if (_.isEmpty(dateOfCremation) || _.isEmpty(slot) || !burialSiteId) {
            errors.push({ message: 'slot_details.date or slot_details.slot or slot_details.site_id missing' });
          }
        }
      } else {
        errors.push({ message: `${updateTypes.toString()} unexpected type value` });
      }
      return errors

    },
    list: ({ siteId }) => {
      const errors = [];
      if (_.isEmpty(siteId)) {
        errors.push({ message: 'slotId missing' });
      }
      return errors
    },
    insert: ({ slotDetails }) => {
      const errors = [];
      const slotKeys = _.keys(slotDetails);
      const missingKeys = _.difference(expectedSlotKeys, slotKeys);
      const validMissingKeys = _.difference(missingKeys, optionalKeys);
      if (validMissingKeys.length) {
        errors.push({ message: `${validMissingKeys.toString()} key(s) are missing` });
      }
      return errors;
    }
  },
  burialSites: {
    getIncidents: ({ status }) => {
      const errors = [];
      const siteStatus = _.values(SITE_STATUS);
      if(!siteStatus.includes(status) && !_.isEmpty(status)) {
        errors.push({ message: `status should be one of ${siteStatus.toString()} ` });
      }
      return errors;
    },
    update: ({ siteId, status}) => {
      const errors = [];
      const siteStatus = _.values(SITE_STATUS);
      if(_.isEmpty(siteId)) {
        errors.push({ message: `siteId missing` });
      } else if(!siteStatus.includes(status)) {
        errors.push({ message: `status should be one of ${siteStatus.toString()} ` });
      }
      return errors;
    }

  },
  user: {
    create: ({ name, password }) => {
      const errors = [];
      if(_.isEmpty(name) || _.isEmpty(password)) {
        errors.push(USERNAME_AND_PASSWORD_REQUIRED)
      }
      return errors;
    }
  },
  validate: (errors) => {
    if (!_.isEmpty(errors)) {
      throw {
        errors,
        statusCode: 400
      }
    }
  },
  exceptionparser: (e) => {
    console.log(e);
    return {
      code: _.get(e, 'statusCode', 500),
      message: {
        error: _.get(e, 'errors', [{ message: 'Unexpected error' }]),
        meta: _.omit(e, ['errors', 'statusCode'])
      },
    }
  }
}