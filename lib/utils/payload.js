const HmacSHA256 = require('crypto-js/hmac-sha256');
const dateUtils = require('./date.js');
const SERVER_URL = "https://api.logtrust.com/lt-api/storedSearchAction.streamjson";

function generateApiPayload(options){
  return {
    method: "POST",
    url: options.serverURL || SERVER_URL,
    headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"},
    body: getPayload4Body(options)
  };
}

function generatePayload(options) {

  var opts = {
    apiKey: options.apiKey,
    dateFrom: dateUtils.getDate(options.dateFrom),
    dateTo: dateUtils.getDate(options.dateTo),
    query: options.query,
    timestamp: new Date().getTime()
  };

  opts.sign = generateSignature(opts, options.apiSecret);

  return opts;
}

function generateSignature(options, secret) {
  const signMsg = options.apiKey
    + options.dateFrom
    + options.dateTo
    + options.query
    + options.timestamp;
  return HmacSHA256(signMsg, secret).toString();
}

function getPayload4Body(options) {
  const payload = generatePayload(options);
  return Object.keys(payload).reduce(reducePayloadToBody(payload), "");
}

function reducePayloadToBody(payload) {
  return function (prev, key) {
    return prev += key + "=" + payload[key] + "&";
  }
}

module.exports = {
  generateApiPayload
};
