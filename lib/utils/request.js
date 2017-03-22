const oboe = require('oboe');
const payload = require('./payload.js');

/**
 * Send request to API server
 * @param options
 */
function send(options){
  oboe(payload.generateApiPayload(options))
  .on('fail', console.error)
  .node(handleResponse());
}

/**
 * Print event
 * @param event
 * @returns {*}
 */
function printEvent(event) {
  event = JSON.stringify(event);
  console.log(event);
  event = JSON.parse(event);
  return oboe.drop;
}

/**
 * Handler when response is not ok
 * @param response
 */
function handleSuccess(response) {
  if(!response.success){
    console.log(response.msg);
    this.abort();
  }
}

/**
 * Create handler object
 * @returns {{{success msg}: handleSuccess, [object.*]: printEvent}}
 */
function handleResponse(){
  return {
    '{success msg}': handleSuccess,
    'object.*': printEvent
  };
}

module.exports = {
  send
};
