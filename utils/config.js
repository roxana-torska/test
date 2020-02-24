const configs = function() {
	console.log('env', process.env.NODE_ENV);
	console.log('os.getName()', )
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        APP_URL: 'http://Nivs-MacBook-Pro.local:3001',
        API_URL: 'http://Nivs-MacBook-Pro.local:8282/api',
        API_IMAGE_URL: 'http://Nivs-MacBook-Pro.local:8282'
      };

    case 'production':
      return {
        APP_URL: 'http://dishin.co',
        API_URL: 'http://backend.dishin.co/api',
        API_IMAGE_URL: 'http://backend.dishin.co'
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
