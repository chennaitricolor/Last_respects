const moment = require('moment-timezone');
const _ = require('lodash');
const { SLOT_STATUS } = require('../constant/enum');
const { SLOT_STATUS_TRANSITION_NOT_ALLOWED } = require('../constant/constants');

const getSlotsForADate = (slotDetails, bookedSlots, date) => {
  return _.reduce(slotDetails, (acc, { slot }) => {
    acc[slot] = _.find(bookedSlots, ({ slot: booked_slot, dateOfCremation }) => {
      return booked_slot === slot && moment(dateOfCremation).isSame(moment(date), 'd');
    }) || {};
    return acc;
  }, {})
}


module.exports = {
  
  constructSlots: (slotDetails, bookedSlots, dates) => {
    const result = _.reduce(dates, (acc, date) => {
      const validSlotDetails = _.filter(slotDetails, ({ validFrom, validTill }) => {
        return moment(date).isBetween(moment(validFrom), moment(validTill), 'd', '[]');
      });
      acc[date.format('DD-MM-YYYY')] = getSlotsForADate(validSlotDetails, bookedSlots, date);
      return acc;
    }, {});
    return result;
  },
  getTimeField: (status) => {
    return {
      [SLOT_STATUS.COMPLETED]: 'actualCompletedTime',
      [SLOT_STATUS.ARRIVED]: 'actualArrivedTime',
      [SLOT_STATUS.STARTED]: 'actualStartedTime',
    }[status];
  },
  validateStateTransition: (prev = SLOT_STATUS.BOOKED, next) => {
    const acceptedTransitions = {
      [SLOT_STATUS.BOOKED]: [SLOT_STATUS.BOOKED],
      [SLOT_STATUS.ARRIVED]: [SLOT_STATUS.ARRIVED, SLOT_STATUS.BOOKED],
      [SLOT_STATUS.STARTED]: [SLOT_STATUS.STARTED, SLOT_STATUS.ARRIVED],
      [SLOT_STATUS.COMPLETED]: [SLOT_STATUS.COMPLETED, SLOT_STATUS.STARTED],
      [SLOT_STATUS.CANCELLED]: [SLOT_STATUS.CANCELLED, SLOT_STATUS.BOOKED, SLOT_STATUS.ARRIVED],
      [SLOT_STATUS.REASSIGNED]: [SLOT_STATUS.REASSIGNED, SLOT_STATUS.BOOKED, SLOT_STATUS.ARRIVED],
      [SLOT_STATUS.NOSHOW]: [SLOT_STATUS.NOSHOW, SLOT_STATUS.BOOKED, SLOT_STATUS.ARRIVED],
    }
    if (!_.includes(acceptedTransitions[next], prev)) {
      throw {
        ...SLOT_STATUS_TRANSITION_NOT_ALLOWED,
        transition: `${prev} -> ${next}`
      }
    }
  }
}