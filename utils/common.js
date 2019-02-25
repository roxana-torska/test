const jwt_decode = require('jwt-decode');

const getToken = function (req) {
  let token = req.cookies['DishIn-token'] || null;
  console.log('token-=', token, '--------');
  if (token) {
    return token;
  }
  return null;
};
const setToken = function (res, token) {
  res.cookie('DishIn-token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
};

const getDecodedToken = function (token) {
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

module.exports = { getToken, setToken, getDecodedToken };
