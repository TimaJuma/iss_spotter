// IMPORT ALL FUNCTION TO BE EXECUTED in A SEQUENCE

const {fetchMyIP} = require('./iss'); //fetch my IP
const {fetchCoordsByIP} = require('./iss'); //fetch my Coordinates
const {fetchISSFLyOverTimes} = require('./iss'); //Nr of times space station passess



// SUPERIOR FUNCTION THAT WILL CALL OTHER ABOVE FUNCTION IN ORDER
const {nextISSTimesForMyLocation} = require('./iss');



//PRINT THE REQUEST TIME IN MILLISECONDS
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) { // array of 5 passes
    const datetime = new Date(0); //create date object
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};



// MAIN FETCHER OF INFO. It will evoke 3 functions in sequence by passing return value of each function to next one( returns JSON WITH ARRAY OF RESPONSE WITH 5 ELEMENTS)
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It did't work, because of: ${error}`);
  }

  // in case of no error
  printPassTimes(passTimes);
});




