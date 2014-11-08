// log.js
//
var logger = require('winston');
var fs = require('fs')
var path=require('path');

//	Create the directory if it doesn't already exist
var logs_path = path.resolve(__dirname, "../logs/");
if (!fs.existsSync(logs_path)) {
	fs.mkdirSync(logs_path);
}

// Default to development.log unless otherwise specified
// in the NODE_ENV environment variable.
var logfile = __dirname + '/../logs/development.log';
if (process.env.NODE_ENV == 'production') {
	logfile = __dirname + '/../logs/production.log';
}

// Add the the file logger
logger.add(logger.transports.File, {filename: logfile});

module.exports = logger