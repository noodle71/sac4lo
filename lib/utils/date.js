const moment = require('moment');
const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss SSS";

/**
 * Returns a date for API payload
 * @param date
 * @returns {*}
 */
function getDate(date = '0') {
  //Infinite Query (Not set date)
  if (date === '-1') {
    return date;
  } else if (date === '0') {
    //Set today
    return new Date().getTime();
  } else {
    return parseDateToEpoch(date);
  }
}

/**
 * Converts a date into epoch (milliseconds)
 * @param date
 * @returns {number}
 */
function parseDateToEpoch(date) {
  return moment(date, DATE_FORMAT).unix() * 1000;
}

/**
 * Check if date is correct
 * @param date
 * @returns {boolean|*}
 */
function isValidDate(date) {
  return moment(date, DATE_FORMAT).isValid();
}

module.exports = {
  DATE_FORMAT,
  getDate,
  isValidDate
};
