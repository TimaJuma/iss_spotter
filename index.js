const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
// const request = require('request');

const ipp = fetchMyIP((error, ip) => {
  if (error) {
    console.log(`It did not work because of: ${error}`);
    return;
  }

  console.log(`It worked! Returned IP: ${ip}`, typeof ip);
  return ip;
});

console.log(ipp);
const urlCoor = `https://ipvigilante.com/${ipp}`;
request('https://ipvigilante.com/23.17.66.18', (err, response, body)=> {
  console.log('sth');
  console.log(JSON.parse(body));
});


