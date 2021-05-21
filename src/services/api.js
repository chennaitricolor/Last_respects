import axios from 'axios';

function callFetchAxios(endpoint, params, method, reqbody = {}, headerToken = null) {
  let axiosInstance;
  if (headerToken !== null) {
    axiosInstance = axios.create({
      headers: {
        'x-access-token': headerToken,
        'Content-Type': 'application/json',
      },
    });
  } else {
    axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  switch (method) {
    case 'GET':
      return axiosInstance
        .get(endpoint, {
          params,
        })
        .then((response) => response)
        .catch((error) => {
          throw error;
        });
    case 'POST':
      return axiosInstance
        .post(endpoint, reqbody)
        .then((response) => response)
        .catch((error) => error);
    case 'PUT':
      return axiosInstance
        .put(endpoint, reqbody)
        .then((response) => response)
        .catch((error) => error);
    case 'DELETE':
      return axiosInstance
        .delete(endpoint)
        .then((response) => response)
        .catch((response) => response);
    default:
      return '';
  }
}

export const callFetchApi = (...params) => callFetchAxios(...params);

export default callFetchApi;
