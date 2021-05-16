const errors = {
  // List of errors
  SLOT_NOT_FOUND: {
    errorCode: 'SLOT_NOT_FOUND',
    message: 'Slot not found'
  },
  SLOT_STATUS_TRANSITION_NOT_ALLOWED: {
    errorCode: 'SLOT_STATUS_TRANSITION_NOT_ALLOWED',
    message: 'Slot status transition not found'
  }
}

module.exports = {
  DATE_RANGE: {
    VALUE: 4,
    UNIT: 'd'
  },
  ...errors
}