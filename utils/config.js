var ip = require("ip");
console.dir (  );
const configs = function() {
  console.log('env', process.env.NODE_ENV);
  console.log('ip', ip.address());
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        APP_URL: 'http://localhost:3001',
        API_URL: `${ip.address()}:8001`,
        API_IMAGE_URL: 'http://localhost:8282'
      };

    case 'production':
      return {
        APP_URL: 'https://dishin.mindzhub.com',
        API_URL: 'https://dishinapi.mindzhub.com/api',
        API_IMAGE_URL: 'https://dishinapi.mindzhub.com'
      };
    default:
      return {
        APP_URL: 'http://localhost:3001',
        API_URL: 'http://localhost:8282/api',
        API_IMAGE_URL: 'http://localhost:8282'
      };
  }
};
const weekDay = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun'
};

const settings = {
  ...configs(),
  weekDay
};
module.exports = settings;
