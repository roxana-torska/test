const jwt_decode = require('jwt-decode');
const Cookies = require('js-cookie');
const getToken = function() {
  let data = JSON.parse(Cookies.get('DishIn-token') || null); //JSON.parse(localStorage.getItem('DishIn-token') || null);
  if (data && data.token) {
    return data.token;
  }
  return null;
};
const setToken = function(token) {
  return Cookies.set('DishIn-token', JSON.stringify(token) || null); //localStorage.setItem('DishIn-token', JSON.stringify(token) || null);
};

const getDecodedToken = function(token) {
  token = token || getToken();
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

//export { getToken, setToken };

module.exports = { getToken, setToken, getDecodedToken };
