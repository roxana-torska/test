var os = require('os');
var ifaces = os.networkInterfaces();
var localIPAddress = '';

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if(iface.address.indexOf('192.168') > -1){
      localIPAddress = iface.address;
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
    }
    ++alias;
  });
});

localIPAddress = localIPAddress || 'localhost';

const configs = function () {
  console.log("env", process.env.NODE_ENV);
  console.log("os.getName()");
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        APP_URL: "http://"+localIPAddress+":3001",
        API_URL: "http://"+localIPAddress+":8282/api",
        API_IMAGE_URL: localIPAddress+":8282",
      };
    case "production":
      return {
        APP_URL: "http://13.58.25.57:3001",
        API_URL: "http://13.58.25.57:8282/api",
        API_IMAGE_URL: "13.58.25.57:8282",
      };
    default:
      return {
        APP_URL: "http://localhost:3001",
        API_URL: "http://localhost:8282/api",
        API_IMAGE_URL: "localhost:8282",
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
