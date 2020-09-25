const configs = function () {
  console.log("env", process.env.NODE_ENV);
  console.log("os.getName()");
  console.log('EENNVV()' + process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        APP_URL: "http://localhost:3001",
        API_URL: "http://localhost:8282/api",
        API_IMAGE_URL: "localhost:8282",
      };
    /* 
    case "production":
      return {
        APP_URL: "http://dyne.menu"
        API_URL: "http://backend.dyne.menu/api",
        API_IMAGE_URL: "http://backend.dyne.menu",
      }; */
    default:
      return {
        APP_URL: "http://ec2-13-58-25-57.us-east-2.compute.amazonaws.com",
        API_URL: "http://api.ec2-13-58-25-57.us-east-2.compute.amazonaws.com/api",
        API_IMAGE_URL: "http://api.ec2-13-58-25-57.us-east-2.compute.amazonaws.com",
      };
  }
};
const weekDay = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const settings = {
  ...configs(),
  weekDay,
};
module.exports = settings;
