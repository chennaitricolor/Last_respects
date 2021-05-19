const _ = require('lodash');
const { SLOT_UPDATE_TYPE } = require('../constant/enum');

module.exports = {
  slots : {
    update: ({ slotId, slotDetails = {}, reason, type }) => {
      const errors = [];
      if(_.isEmpty(slotId)) {
        errors.push({ message: 'slotId missing' });
      }
      if(_.includes(_.values(SLOT_UPDATE_TYPE), type)) {
       if((type === SLOT_UPDATE_TYPE.CANCEL || type === SLOT_UPDATE_TYPE.REASSIGN) && _.isEmpty(reason) ) {
        errors.push({ message: 'reason missing' });
       } else if(type === SLOT_UPDATE_TYPE.REASSIGN) {
         const { dateOfCremation, slot, burialSiteId } = slotDetails;
         if(_.isEmpty(dateOfCremation) || _.isEmpty(slot) || _.isEmpty(burialSiteId)) {
          errors.push({ message: 'slot_details.date or slot_details.slot or slot_details.site_id missing' });
         }
       }
      } else {
        errors.push({ message: 'unexpected type value' });
      }
      return errors

    },
    list: ({ siteId }) => {
      const errors = [];
      if(_.isEmpty(siteId)) {
        errors.push({ message: 'slotId missing' });
      }
      return errors
    }
  },
  validate: (errors) => {
    if(!_.isEmpty(errors)) {
      throw {
        errors,
        statusCode: 400
      }
    }
  },
  exceptionparser: (e) => {
    console.log(e);
    return {
      errors: _.get(e, 'errors', [{ message: 'Unexpected error' }]),
      code: _.get(e, 'statusCode', 500)
    }
  }
}