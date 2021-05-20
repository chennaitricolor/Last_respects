import superagent from 'superagent';
import Promise from 'promise';

/**
 * Is this response object considered successful?
 * @param {Object} res
 * @returns {boolean}
 */
function isSuccess(res) {
  /* Temp Solution */
  return res.ok;
  /* End Solution */
  // return res.ok && res.body.status && res.body.status.success && (!res.body.status.errors || !res.body.status.errors.length);
}

/**
 * Create a new error from the res (this is assuming there is an error)
 * @param {Object} res Response object (from superagent)
 * @returns {Error}
 */
function makeError(res) {
  return new Error(
    (res.body && res.body.responseStatus) ||
    (res.body && res.body.status && res.body.status.message) ||
    'Api error!'
  );
}

/**
 * Extended Request object to format the default request correctly and handle response
 */
class ApiRequest extends superagent.Request {

  // eslint-disable-next-line no-useless-constructor
  constructor(method, url) {
    super(method, url);
  }

  end(cb) {
    let _super = superagent.Request.prototype.end;
    let context = this;

    return new Promise(function (accept, reject) {
      _super.call(context, function (err, res) {

        if (cb) {
          cb(err, res);
        }

        if (!err && isSuccess(res)) {
          /* Temp Solution */
          if(res.body === null){
            res.body = {data:[]};
          }
          /* End Solution */
          accept(res.body.data);
        } else {
          reject(err || makeError(res));
        }
      });
    });
  }
}

/**
 * Helper for making a GET request
 * @param {String} url
 * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function get(url, data) {
  let req = new ApiRequest('GET', url);
  if (data) {
    req.query(data);
  }

  return req;
}

/**
 * Helper for making a HEAD request
 * @param {String} url
 * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function head(url, data) {
  let req = new ApiRequest('HEAD', url);
  if (data) {
    req.send(data);
  }

  return req;
}

/**
 * Helper for making a DELETE request
 * @param {String} url
 * * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function del(url, data) {
  let req = new ApiRequest('DELETE', url);
  if (data) {
    req.send(data);
  }

  return req;
}

/**
 * Helper for making a PATCH request
 * @param {String} url
 * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function patch(url, data) {
  let req = new ApiRequest('PATCH', url);
  if (data) {
    req.send(data);
  }

  return req;
}

/**
 * Helper for making a POST request
 * @param {String} url
 * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function post(url, data) {
  let req = new ApiRequest('POST', url);

  if (data) {
    req.send(data);
  }

  return req;
}

/**
 * Helper for making a PUT request
 * @param {String} url
 * @param {Object} [data]
 * @returns {ApiRequest}
 */
export function put(url, data) {
  let req = new ApiRequest('PUT', url);
  if (data) {
    req.send(data);
  }

  return req;
}