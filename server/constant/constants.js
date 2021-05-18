const errors = {
  // List of errors
  SLOT_NOT_FOUND: {
    errors: [{
          errorCode: 'SLOT_NOT_FOUND',
          message: 'Slot not found'
        }],
      statusCode: 404
  },
  BAD_REQUEST: {
    errors: [{
      errorCode: 'BAD_REQUEST',
      message: 'Please Check the Given Value'
    }],
    statusCode: 400

  },
  SLOT_UNAVAILABLE: {
    errors: [{
      errorCode: 'SLOT_UNAVAILABLE',
      message: 'Requested slot is either booked or unavailable'
    }],
  statusCode: 400

  },
  SLOT_STATUS_TRANSITION_NOT_ALLOWED: {
    errors: [{
      errorCode: 'SLOT_STATUS_TRANSITION_NOT_ALLOWED',
      message: 'Slot status transition not found'
    }],
  statusCode: 400
  }
}

module.exports = {
  DATE_RANGE: {
    VALUE: 4,
    UNIT: 'd'
  },
  ...errors
}