const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const DATE_FORMAT = require('./date.js').DATE_FORMAT;

//Command line options definition
const OPTION_LIST = [
  {
    name: 'apiKey',
    alias: 'k',
    type: String,
    typeLabel: "[underline]{String}",
    description: "Enter Logtrust API Key (Within Administration/Credentials)"
  },
  {
    name: 'apiSecret',
    alias: 's',
    type: String,
    typeLabel: "[underline]{String}",
    description: "Enter Logtrust API Secret (Within Administration/Credentials)"
  },
  {
    name: 'dateFrom',
    alias: 'f',
    type: String,
    typeLabel: "[underline]{String}",
    description: `Date from (${DATE_FORMAT}). If it's not set, then it means "now"`
  },
  {
    name: 'dateTo',
    alias: 't',
    type: String,
    typeLabel: "[underline]{String}",
    description: `Date to (${DATE_FORMAT}). If it's not set, then it means "now". If it's -1, then is an infinite query`
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    typeLabel: "",
    description: "Show help"
  },
  {
    name: 'query',
    alias: 'q',
    type: String,
    typeLabel: "[underline]{String}",
    description: "Logtrust query"
  },
  {
    name: 'serverURL',
    alias: 'u',
    type: String,
    typeLabel: "[underline]{String}",
    description: "Logtrust API server URL"
  }
];

//Command line helper
const SECTIONS = [
  {
    header: 'Stream API Connector 4 Logtrust',
    content: 'Get Logtrust query results'
  },
  {
    header: 'Options',
    optionList: OPTION_LIST
  }
];

/**
 * Print command line usage
 */
function printUsage() {
  console.log(getUsage(SECTIONS));
}

/**
 * Get command line arguments
 * @returns {Object}
 */
function getCmdLineOptions() {
  return commandLineArgs(OPTION_LIST);
}

module.exports = {
  getCmdLineOptions,
  printUsage
};
