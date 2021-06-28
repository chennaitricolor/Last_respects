import { get as getlodash } from 'lodash';
import moment from 'moment';

const jwt = require('jsonwebtoken');

const setCookie = (key, value, expMinutes = 120) => {
  const d = new Date();
  d.setTime(d.getTime() + expMinutes * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = `${key}=${value};${expires};path=/`;
  return true;
};

const getCookie = (key) => {
  const cookies = Object.fromEntries(
    document.cookie.split(/; /).map((c) => {
      const [key, v] = c.split('=', 2);
      return [key, decodeURIComponent(v)];
    }),
  );
  return cookies[key] || '';
};

const deleteCookie = (key) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

const isTokenAlive = (token) => {
  const jwtTokenData = jwt.decode(token);

  const expiryTime = getlodash(jwtTokenData, 'exp', '');
  const currentTime = Math.round(new Date().getTime() / 1000);

  return currentTime <= expiryTime;
};

export const isCurrentTimeCrossedSlotTime = (time, date) => {
  let currentDate = moment().format('DD-MM-YYYY');
  if (currentDate === date) {
    let timeArray = time.split('-');
    let trimmedTimeArray = [];

    timeArray.forEach((timeValue) => {
      trimmedTimeArray.push(timeValue.trim());
    });

    if (trimmedTimeArray.length === 2) {
      if (moment(trimmedTimeArray[1], 'hh:mm A').isBefore(moment())) return true;
    }
    return false;
  }
  return false;
};

export const yesNoRadioButton = [
  { id: true, value: 'Yes' },
  { id: false, value: 'No' },
];

export const genderRadioButton = [
  { id: 'MALE', value: 'Male' },
  { id: 'FEMALE', value: 'Female' },
  { id: 'TRANSGENDER', value: 'Transgender' },
];

export const buriedRadioButton = [
  { id: 'BURIED', value: 'Burial' },
  { id: 'BURNT', value: 'Burn' },
];

export const placeOfDeathRadioButton = [
  { id: 'HOME', value: 'Home' },
  { id: 'HOSPITAL', value: 'Hospital' },
];

export const attenderRelationship = [
  { id: 'Family', name: 'Family' },
  { id: 'Government', name: 'Government' },
  { id: 'NGO', name: 'NGO' },
  { id: 'Others', name: 'Others' },
];

export const addressProof = [
  { id: 'Aadhar Card', name: 'Aadhar Card' },
  { id: 'Driving License', name: 'Driving License' },
  { id: 'Ecard', name: 'E-Card' },
  { id: 'Ration Card', name: 'Ration Card' },
];

export const cancellationReason = [
  { id: 'Did Not Arrive', name: 'Did Not Arrive' },
  { id: 'Machinery Issue', name: 'Machinery Issue' },
  { id: 'Rescheduled', name: 'Rescheduled' },
  { id: 'Others', name: 'Others' },
];

export const bookingStatus = {
  NEW: [{ id: 'BOOKED', value: 'Booked' }],
  BOOKED: [
    { id: 'BOOKED', value: 'Booked' },
    { id: 'ARRIVED', value: 'Arrived' },
    { id: 'CANCEL', value: 'Cancelled Booking' },
  ],
  ARRIVED: [
    { id: 'ARRIVED', value: 'Arrived' },
    { id: 'STARTED', value: 'Started' },
    { id: 'CANCEL', value: 'Cancelled Booking' },
  ],
  STARTED: [
    { id: 'STARTED', value: 'Started' },
    { id: 'COMPLETE', value: 'Cremated' },
  ],
  COMPLETED: [{ id: 'COMPLETED', value: 'Cremated' }],
  CANCELLED: [{ id: 'CANCELLED', value: 'Cancelled Booking' }],
  REASSIGNED: [{ id: 'REASSIGNED', value: 'Re-Assigned' }],
  NOSHOW: [{ id: 'NOSHOW', value: 'No Show' }],
};

export const enableReassignButtonStatus = ['BOOKED', 'ARRIVED', 'REASSIGNED'];

export const alwaysDisableSaveButton = ['COMPLETED', 'CANCELLED', 'NOSHOW'];

const getReassignReasons = () => {
  const reAssignReasons = [
    { reason: 'Attender Requested', id: 1 },
    { reason: 'Machinery Failure', id: 2 },
    { reason: 'Staff Not Available', id: 3 },
    { reason: 'Requesting Time Availablity', id: 4 },
    { reason: 'Other', id: 5 },
  ];
  return reAssignReasons;
};

const getMomentDateStr = (date, format) => {
  return moment(date).format(format);
};

const isMobile = () => {
  return window.innerWidth < 768 ? true : false;
};

export { getCookie, setCookie, deleteCookie, decodeToken, isTokenAlive, getReassignReasons, getMomentDateStr, isMobile };
