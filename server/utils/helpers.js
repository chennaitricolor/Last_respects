const moment = require('moment-timezone');
const _ = require('lodash');
const { SLOT_STATUS } = require('../constant/enum');
const { SLOT_STATUS_TRANSITION_NOT_ALLOWED } = require('../constant/constants');

module.exports = {
  getSlotsForADate: (slotDetails, bookedSlots, date) => {
    return _.reduce(slotDetails, (acc, { slot }) => {
      acc[slot] = _.find(bookedSlots, ({ slot: booked_slot, dateOfCremation }) => {
        return booked_slot === slot && moment(dateOfCremation).isSame(moment(date));
      }) || {};
      return acc;
    }, {})
  },
  constructSlots: (slotDetails, bookedSlots, dates) => {
    const result = _.reduce(dates, (acc, date) => {
      const validSlotDetails = _.filter(slotDetails, ({ validFrom, validTill }) => {
        return moment(date).isBetween(moment(validFrom), moment(validTill), '[]');
      });
      acc[date] = this.getSlotsForADate(validSlotDetails, bookedSlots, date);
      return acc;
    }, {});
    return result;
  },
  validateStateTransition: (prev = SLOT_STATUS.BOOKED, next) => {
    const acceptedTransitions = {
      [SLOT_STATUS.BOOKED]: [SLOT_STATUS.BOOKED],
      [SLOT_STATUS.COMPLETED]: [SLOT_STATUS.COMPLETED, SLOT_STATUS.BOOKED],
      [SLOT_STATUS.CANCELLED]: [SLOT_STATUS.CANCELLED, SLOT_STATUS.BOOKED],
      [SLOT_STATUS.REASSIGNED]: [SLOT_STATUS.REASSIGNED, SLOT_STATUS.BOOKED],
    }
    if(!_.includes(acceptedTransitions[next], prev)) {
      throw {
        errors: [{
            ...SLOT_STATUS_TRANSITION_NOT_ALLOWED,
            transition: `${prev} -> ${next}`
        }]
      }
    }
  }
}