var mongoose = require('mongoose');

var libs = process.cwd() + '/libs/';
var Constants = require("../../common/app_constants");

//var log = require(libs + 'log')(module);
var config = require(libs + 'config');

mongoose.connect(Constants.MONGODB_URL);

var db = mongoose.connection;

db.on('error', function (err) {
	//log.error('Connection error:', err.message);
    console.log('Connection error:' + err.message);
});

db.once('open', function callback () {
	//log.info("Connected to DB!");
    console.log("Connected to DB!");
});

module.exports = mongoose;