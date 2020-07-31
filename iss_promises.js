const request = require('request-promise-native');


// URLs to be used in functions to make API request
const urlIP = "https://api.ipify.org?format=json";
const urlCoords = 'https://ipvigilante.com/';


//  1. fetches local IP adress from returned API as an Object
const fetchMyIP = ()=> {
  return request(urlIP);
};


// 2. fetches coordinates according to passed IP
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`${urlCoords}${ip}`);
};


// 3. fetches fly times of space object accordig to passed coordinates
const fetchISSFlyOverTimes = (body) => {
  const {latitude, longitude} = JSON.parse(body).data;
  const urlLatLon = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(urlLatLon);
};


// 4. common function to envoke 3 abovre functions and passing return arguments to next one. so all functions are executed in sequence.
const nextISSTimesForMyLocation = ()=> {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};



module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes
  nextISSTimesForMyLocation
};