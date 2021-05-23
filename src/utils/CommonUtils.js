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


export { getCookie, setCookie, deleteCookie, isTokenAlive, getReassignReasons, getMomentDateStr};
