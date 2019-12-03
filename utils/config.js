const configs = function() {
	console.log('env', process.env.NODE_ENV);
	console.log('os.getName()', )
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        APP_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com',
        API_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com:8282/api',
        API_IMAGE_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com:8282'
      };

    case 'production':
      return {
        APP_URL: 'http://ec2-3-120-243-142.eu-central-1.compute.amazonaws.com',
        API_URL: 'http://ec2-3-120-243-142.eu-central-1.compute.amazonaws.com:8282/api',
        API_IMAGE_URL: 'http://ec2-3-120-243-142.eu-central-1.compute.amazonaws.com:8282'
      };
    default:
      return {
        APP_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com',
        API_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com:8282/api',
        API_IMAGE_URL: 'http://ec2-54-93-251-83.eu-central-1.compute.amazonaws.com:8282'
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
