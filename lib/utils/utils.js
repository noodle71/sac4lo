const HmacSHA256 = require('crypto-js/hmac-sha256');
const dateUtils = require('./date.js');

function showHelp(options) {
  return options.help || !paramsAreOk(options);
}

function paramsAreOk(options) {
  return !!options.apiKey
    && !!options.apiSecret
    && dateUtils.isValidDate(options.dateFrom) || options.dateFrom === '0' || typeof options.dateFrom === 'undefined'
    && (dateUtils.isValidDate(options.dateTo) || options.dateTo === '-1' || options.dateTo === '0' || typeof options.dateFrom === 'undefined')
    && !!options.query;
}

module.exports = {
  showHelp
};
