const moment = require('moment');
const { SLOT_STATUS } = require('./enum');

const errors = {
  // List of errors
  USER_NOT_FOUND: {
    errors: [{
      errorCode: 'USER_NOT_FOUND',
      message: 'user not found'
    }],
    statusCode: 404
  },
  USER_ALREADY_EXISTS: {
    errors: [{
      errorCode: 'USER_ALREADY_EXISTS',
      message: 'User already exists'
    }],
    statusCode: 400
  },
  USERNAME_AND_PASSWORD_REQUIRED: {
    errors: [{
      errorCode: 'USERNAME_AND_PASSWORD_REQUIRED',
      message: 'Username and password required'
    }],
    statusCode: 400
  },
  INCORRECT_USERNAME_PASSWORD: {
    errors: [{
      errorCode: 'INCORRECT_USERNAME_PASSWORD',
      message: 'Incorrect username and password'
    }],
    statusCode: 403
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
  BOOKING_EXISTS: {
    errors: [{
      errorCode: 'BOOKING_EXISTS',
      message: 'Booking already exists'
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

const expectedSlotKeys = [
  'slot',
  'updatedTime',
  'createdTime',
  'proofId',
  'proofType',
  'deathCertNo',
  'deceasedName',
  'dateOfCremation',
  'attenderType',
  'attenderAddress',
  'reasonForCancellation',
  'attenderContact',
  'attenderName',
  'dependent',
  'age',
  'sex',
  'cremationType',
  'placeOfDeath',
  'covidRelated',
  'burialSiteId',
  'aadharOfDeceased',
];

const optionalKeys = [
  'proofId',
  'proofType',
  'reasonForCancellation',
  'updatedTime',
  'createdTime',
  'aadharOfDeceased',
];

const secret = process.env.JWT_TOKEN_SECRET;

const blockedSlots = [SLOT_STATUS.BOOKED, SLOT_STATUS.ARRIVED, SLOT_STATUS.STARTED, SLOT_STATUS.COMPLETED];

const SALT_ROUNDS = 10;

const BOOKING_ID_PREFIXES = {
  GCC: 'GCC-LR-'
}

module.exports = {
  success,
  refreshTokenExpiry,
  secret,
  tokenExpiry,
  blockedSlots,
  expectedSlotKeys,
  SALT_ROUNDS,
  optionalKeys,
  DATE_RANGE: {
    VALUE: 3,
    UNIT: 'd'
  },
  BOOKING_ID_PREFIXES,
  ...errors
}