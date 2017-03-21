const HmacSHA256 = require('crypto-js/hmac-sha256');
const oboe = require('oboe');
const dateUtils = require('./date.js');
const payload = require('./payload.js');

function send(options){
  oboe(payload.generateApiPayload(options))
  .on('fail', console.error)
  .node(handleResponse());
}

function printEvent(event) {
  event = JSON.stringify(event);
  console.log(event);
  event = JSON.parse(event);
  return oboe.drop;
}

function handleSuccess(response) {
  if(!response.success){
    console.log(response.msg);
    this.abort();
  }
}

function handleResponse(){
  return {
    '{success msg}': handleSuccess,
    'object.*': printEvent
  };
}

module.exports = {
  send
};
