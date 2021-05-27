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

const isTokenAlive = (token) => {
  const jwtTokenData = jwt.decode(token);

  const expiryTime = getlodash(jwtTokenData, 'exp', '');
  const currentTime = Math.round(new Date().getTime() / 1000);

  return currentTime <= expiryTime;
};

export const yesNoRadioButton = [
  { id: true, value: 'Yes' },
  { id: false, value: 'No' },
];

export const attenderRelationship = [
  { id: 'family', name: 'Family' },
  { id: 'ngo', name: 'NGO' },
  { id: 'relative', name: 'Relative' },
];

export const addressProof = [
  { id: 'aadharCard', name: 'Aadhar Card' },
  { id: 'drivingLicense', name: 'Driving License' },
  { id: 'rationCard', name: 'Ration Card' },
];

export const cancellationReason = [{ id: 'machinery issue', name: 'Machinery Issue' }];

export const bookingStatus = {
  NEW: [{ id: 'BOOKED', value: 'Booked' }],
  BOOKED: [
    { id: 'BOOKED', value: 'Booked' },
    { id: 'ARRIVED', value: 'Arrived' },
    { id: 'NOSHOW', value: 'No Show' },
    { id: 'CANCEL', value: 'Cancelled Booking' },
  ],
  ARRIVED: [
    { id: 'ARRIVED', value: 'Arrived' },
    { id: 'STARTED', value: 'Started' },
    { id: 'NOSHOW', value: 'No Show' },
    { id: 'CANCEL', value: 'Cancelled Booking' },
  ],
  STARTED: [
    { id: 'STARTED', value: 'Started' },
    { id: 'COMPLETE', value: 'Completed' },
  ],
  COMPLETED: [{ id: 'COMPLETED', value: 'Completed' }],
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
}

const isMobile = () =>{
  return window.innerWidth< 768 ? true: false;
}

export { getCookie, setCookie, deleteCookie, isTokenAlive, getReassignReasons, getMomentDateStr,isMobile};
