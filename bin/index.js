#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const oboe = require('oboe');
const utils = require('../utils/utils.js');
const https = require('https');
const url = require('url');

const serverURL = "https://api.logtrust.com/lt-api/storedSearchAction.streamjson";

//Command line options definition
const optionList = [
  { name: 'apiKey', alias: 'k', type: String, typeLabel: "[underline]{String}", description: "Enter Logtrust API Key (Within Administration/Credentials)"},
  { name: 'apiSecret', alias: 's', type: String, typeLabel: "[underline]{String}", description: "Enter Logtrust API Secret (Within Administration/Credentials)"},
  { name: 'dateFrom', alias: 'f', type: String, typeLabel: "[underline]{String}", description: `Date from (${utils.DATE_FORMAT}). If it's not set, then it means "now"`},
  { name: 'dateTo', alias: 't', type: String, typeLabel: "[underline]{String}", description: `Date to (${utils.DATE_FORMAT}). If it's not set, then it means "now". If it's -1, then is an infinite query`},
  { name: 'help', alias: 'h', type: Boolean, typeLabel: "", description: "Show help"},
  { name: 'query', alias: 'q', type: String, typeLabel: "[underline]{String}", description: "Logtrust query"},
  { name: 'serverURL', alias: 'u', type: String, typeLabel: "[underline]{String}", description: "Logtrust API server URL"}
];
const options = commandLineArgs(optionList);

//Command line helper
const sections = [
  {
    header: 'Stream API Connector 4 Logtrust',
    content: 'Get Logtrust query results'
  },
  {
    header: 'Options',
    optionList
  }
];

function printEvent(event){
  event = JSON.stringify(event);
  console.log(event);
  event = JSON.parse(event);
  return oboe.drop;
}

//Display help
if(options.help || !utils.paramsAreOk(options)){
	const usage = getUsage(sections);
	console.log(usage);
}else{
	//Set timestamp to check signature
	options.timestamp = new Date().getTime();
	const postURL = url.parse(options.serverURL || serverURL);
	const postData = utils.getPayload4Body(options);
	var success = true;

	oboe({
		method: "POST",
		url: options.serverURL || serverURL,
		headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"},
		body : postData
	})
	.on('fail', console.error)
	.node({
		'success': function(isSuccess){success = success && isSuccess},
		'msg': function(msg){if(!success){console.error('ERROR:',msg)}},
		'object.*': printEvent
	});
}
