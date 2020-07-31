const request = require('request');



// GET MY IP
const fetchMyIP = callback => {
  // fetch IP address from JSON API
  const urlIP = "https://api.ipify.org?format=json";
  request(urlIP, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    //if no error but status not OK
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when tried to fetch IP. Response : ${response}`;
      callback(Error(msg), null);
      return;
    }


    //when status 200, OK
    callback(null, JSON.parse(body).ip);
    return;
  });
};



const fetchCoordsByIP = (ip, cb)=> {
  const urlCoor = `https://ipvigilante.com/${ip}`;
  request(urlCoor, (err, response, body)=> {
    if (err) {
      callback(err, null);
      return;
    }

    // if status not OK
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

  });
};








module.exports = {fetchMyIP,
  // fetchCoordsByIP
};