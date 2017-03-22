#!/usr/bin/env node

const cmdUtils = require('../lib/utils/commandLine.js');
const app = require('../lib/core/app.js');

//Get command line options
const options = cmdUtils.getCmdLineOptions();
app.run(options);
