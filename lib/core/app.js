const utils = require('../utils/utils.js');
const request = require('../utils/request.js');
const cmdUtils = require('../lib/utils/commandLine.js');

function run(options){
  //Display help
  if (utils.showHelp(options)) {
    cmdUtils.printUsage();
  } else {
    //Send request
    request.send(options);
  }
}

module.exports = {
  run
};
