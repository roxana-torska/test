const fetch = require('isomorphic-fetch');

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    let responseJson = await response.json();
    let headers = fetchHeaders(response);
    //api return response with status and data node
    return { ...responseJson, headers: headers };
  } else {
    const errorJson = await response.json();
    let error = new Error(errorJson.message);
    error.erroJson = errorJson;
    throw error;
  }
}

function fetchHeaders(response) {
  let headers = {
    _list: {},
    get: function(key) {
      return this._list[key] || null;
    },
    set: function(key, value) {
      this._list[key] = value;
    }
  };
  if (typeof response.headers.entries === 'function') {
    for (var pair of response.headers.entries()) {
      headers.set(pair[0], pair[1]);
    }
  } else {
    const respHeaders = JSON.parse(JSON.stringify(response.headers));
    Object.keys(respHeaders._headers).map(item => {
      headers.set(item, respHeaders._headers[item]);
    });
  }

  return headers;
}

const customError = e => {
  let errorJson = e.errorJson || { message: e.toString() };
  return { error: errorJson, status: 'ERROR' };
};

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
    .then(response => {
      return {
        ...response
      };
    })
    .catch(err => {
      return customError(err);
    });
};

module.exports = { request };
