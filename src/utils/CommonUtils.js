import { get as getlodash } from 'lodash';
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

const getZoneList = () => {
  const zones = [
    {
      label: 'Select',
      value: 'Select',
    },
    {
      label: 'South',
      value: 'South',
    },
    {
      label: 'Central',
      value: 'Central',
    },
    {
      label: 'North',
      value: 'North',
    },
  ];
  return zones;
};

const getSiteList = () => {
  const sites = [
    {
      label: 'Select',
      value: 'Select',
    },
    {
      label: 'Ambattur',
      value: 'Ambattur',
    },
    {
      label: 'Ayanavaram',
      value: 'Ayanavaram',
    },
    {
      label: 'Egmore',
      value: 'Egmore',
    },
  ];
  return sites;
};

export { getCookie, setCookie, deleteCookie, isTokenAlive, getZoneList, getSiteList };
