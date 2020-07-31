// const {fetchMyIP} = require('./iss_promises');
// const {fetchCoordsByIP} = require('./iss_promises');
// const {fetchISSFlyOverTimes} = require('./iss_promises');

/* NOTE: above import simplified to one import of function referencing to above given functions*/

const {nextISSTimesForMyLocation} = require('./iss_promises');





//PRINT THE REQUEST TIME IN MILLISECONDS
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) { // array of 5 passes
    const datetime = new Date(0); //create date object
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};



// Call
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error)=> {
    console.log(`Sth went wrong. Error: ${error}`);
  });