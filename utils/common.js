const jwt_decode = require('jwt-decode');

const getToken = function(req) {
  let token = req.cookies['DishIn-token'] || null;
  if (token) {
    return token;
  }
  return null;
};
const setToken = function(res, token) {
  const expiresIn = new Date();
  expiresIn.setMonth(expiresIn.getMonth() + 1);
  res.cookie('DishIn-token', token, { expires: expiresIn, httpOnly: true });
};

const getDecodedToken = function(token) {
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

const decodeToken = function(req) {
  let token = getToken(req);
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

const getQueryParams = function(data) {
  let result = {};
  let filters = {};
  if (data.filters) {
    let tags = data.filters.tags;
    let price = data.filters.price;
    let searchBy = data.filters.searchBy;
    let distanceToMe = data.filters.distanceToMe;
    let lng = data.filters.location.lng;
    let lat = data.filters.location.lat;
    if (tags.length > 0) {
      filters.tags = tags;
    }
    if (price) {
      filters.price = price;
    }
    if (searchBy) {
      filters.searchBy = searchBy;
    }
    if (distanceToMe) {
      filters.distanceToMe = distanceToMe;
    }
    if (lng && lat) {
      filters.location = {
        lng,
        lat
      };
    }
  }
  if (data.lng && data.lat) {
    filters.location = {
      lng: data.lng,
      lat: data.lat
    };
  }

  if (data.searchText) {
    result.searchText = data.searchText;
  }
  if (data.sort && data.sort === 'distance') {
    result.sort = data.sort;
  } else {
    if (data.sort) {
      result.sort = data.sort;
    }
  }

  if (data.direction) {
    result.direction = data.direction;
  }

  result.filters = filters;
  return result;
};

const setLocation = function(location) {
  if (location) {
    const tempLocation = {
      lng: location.lng,
      lat: location.lat
    };
    localStorage.setItem('location', JSON.stringify(tempLocation));
  }
};

const getLocation = function() {
  let location = localStorage.getItem('location') || '';
  if (location) {
    return JSON.parse(location);
  }
  return null;
};

module.exports = {
  getToken,
  setToken,
  getDecodedToken,
  getQueryParams,
  setLocation,
  getLocation,
  decodeToken
};
