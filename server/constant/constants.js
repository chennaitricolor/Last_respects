const moment = require('moment');

const errors = {
  // List of errors
  USER_NOT_FOUND: {
    message: 'user not found'
  },
  SLOT_NOT_FOUND: {
    errors: [{
      errorCode: 'SLOT_NOT_FOUND',
      message: 'Slot not found'
    }],
    statusCode: 404
  },
  SITE_NOT_FOUND: {
    errors: [{
      errorCode: 'SITE_NOT_FOUND',
      message: 'Site not found'
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

  SLOT_ACCESS_DENIED: {
    errors: [{
      errorCode: 'SLOT_ACCESS_DENIED',
      message: 'Not authorized to book in the site'
    }],
    statusCode: 403

  },

  SITE_ACCESS_DENIED: {
    errors: [{
      errorCode: 'SITE_ACCESS_DENIED',
      message: 'Not authorized to update site'
    }],
    statusCode: 403

  },

  SLOT_STATUS_TRANSITION_NOT_ALLOWED: {
    errors: [{
      errorCode: 'SLOT_STATUS_TRANSITION_NOT_ALLOWED',
      message: 'Slot status transition not found'
    }],
    statusCode: 400
  }
}

const success = {
  USER_CREATION_SUCCESS: {
    success: true,
    message: 'User successfully created',
    auth: true,
  },
  USER_UPDATION_SUCCESS: {
    message: 'userDetails updated successfully'
  },

  USER_DELETED_SUCCESS: {
    message: 'user deleted successfully'
  }
}

const tokenExpiry = 86400;

const refreshTokenExpiry = moment.duration(1, 'month').asSeconds();

const expectedSlotKeys = ['slot', 'updatedTime', 'createdTime', 'proofId', 'proofType', 'deathCertNo', 'deceasedName', 'dateOfCremation', 'reasonForCancellation', 'attenderContact', 'attenderName', 'covidRelated', 'burialSiteId'];
const secret = process.env.JWT_TOKEN_SECRET;
module.exports = {
  success,
  refreshTokenExpiry,
  secret,
  tokenExpiry,
  expectedSlotKeys,
  DATE_RANGE: {
    VALUE: 3,
    UNIT: 'd'
  },
  ...errors
}