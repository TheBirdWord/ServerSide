/* 
 * Create a Mongoose Connection and define the data models.
 */

var mongoose = require('mongoose');
var logger = require('./log');
var config = require('./config');
	
// Connect to mongo
mongoose.connect(config.get('mongoose:uri'));

mongoose.connection.on('error', function callback(err) {
   logger.error('connection error:', err.message);
});
mongoose.connection.once('open', function callback() {
   logger.info("mongoose connection is open");
});

var db = {
   con: mongoose.connection,
   schema: mongoose.Schema,
   model: mongoose.model.bind(mongoose)
}

module.exports = db;