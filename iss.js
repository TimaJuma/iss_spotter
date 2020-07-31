const request = require('request');



// 1. GET MY IP
const fetchMyIP = (cb_1) => {
  // parse IP address from JSON API returned

  const urlIP = "https://api.ipify.org?format=json";

  request(urlIP, (err, response, body) => {
    // if error
    if (err) {
      cb_1(err, null);
      return;
    }

    //if no error but status not OK
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when tried to fetch IP. Response : ${response}`;
      cb_1(Error(msg), null);
      return;
    }


    //when status 200, OK, pass IP, and no error
    cb_1(null, JSON.parse(body).ip);
    return;
  });
};


// =====================================================================================================================


// 2. GET MY COORDINATES according to myIP provided
const fetchCoordsByIP = (ip, cb_2)=> {
  // parse coordinates from JSON API returned

  const urlCoor = `https://ipvigilante.com/${ip}`;

  request(urlCoor, (err, response, body)=> {
    // if error
    if (err) {
      cb_2(err, null);
      return;
    }

    //if no error but status not OK
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb_2(Error(msg), null);
      return;
    }

    //when status 200, pass/return object to next function
    const {latitude, longitude } = JSON.parse(body).data;
    cb_2(null, {latitude, longitude});

  });
};


// =====================================================================================================================


// 3. GET FLY TIMESS PARAMETER accrording to passed cordinates
const fetchISSFLyOverTimes = function(coords, cb_3) {

  // url to fet API of space fly times over head
  const urlLatLon = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  
  request(urlLatLon, (err, response, body)=> {
    // if error
    if (err) {
      cb_3(err, null);
      return;
    }

    //if no error but status not OK
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb_3(Error(msg), null);
      return;
    }

    //when status 200, OK
    const passes = JSON.parse(body).response; // expected array of objects
    cb_3(null, passes);
  });
};


// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================



// THIS FUNCTION EVOKED IN INDEX.JS
const nextISSTimesForMyLocation = (cb_general) => {

  // 1. first function to fetch local IP adress and pass result to callback
  fetchMyIP((error, ip)=> {
    if (error) {
      return cb_general(error, null);
    }

    // 2. accept IP and fetches coordinates
    fetchCoordsByIP(ip, (error, loc) =>{
      if (error) {
        return cb_general(error, null);
      }

      // 3. accept coordiinates and gets info of times fly over
      fetchISSFLyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return cb_general(error, null);
        }

        // 4. passes fly times ifromation to print it
        cb_general(null, nextPasses);
      });
    });
  });
};




module.exports = {fetchMyIP,
  fetchCoordsByIP,
  fetchISSFLyOverTimes,
  nextISSTimesForMyLocation
};