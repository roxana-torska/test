const fetch = require('isomorphic-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function readHeaders(response) {
  let headers = {
    _list: {},
    get: function(key) {
      return this._list[key] || null;
    },
    set: function(key, value) {
      this._list[key] = value;
    }
  };
  // for (var pair of response.headers.entries()) {
  //   headers.set(pair[0], pair[1]);
  // }
  return headers;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = function(url, options) {
  const defaultOptions = {
    //credentials: "include"
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    !newOptions.blob &&
    (newOptions.method === 'POST' || newOptions.method === 'PUT')
  ) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(async response => {
      let responseJson = await response.json();
      let headers = readHeaders(response);
      return {
        data: responseJson || null,
        headers: headers,
        status: responseJson.status ? responseJson.status : 'ok'
      };
    })
    .catch(error => {
      if (error.response) {
        return error;
      }
      return error;
    });
};

module.exports = { request };
