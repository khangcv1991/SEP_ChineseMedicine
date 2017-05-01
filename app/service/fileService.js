/**
 *
 */
var ErrorCodes = require("../common/error_codes");
var Constants = require("../common/app_constants");
var Mongoose = require("mongoose");
var Utility = require("../common/utility");
var fs = require("fs");
// var OriDirectory = require("../Output.txt");
fileService = function () {

    this.privateMongoose = Mongoose.createConnection(Constants.MONGODB_URL);

    var Schema = Mongoose.Schema;

    var DirectorySchema = new Schema({
        workerId: String,
        creatorId: String,
        startTime: Number,
        endTime: Number,
        startImageLink: String,
        endImageLink: String,
        status: String
    });

    this.privateModel = this.privateMongoose.model(Constants.MODEL_NAME_FILE, DirectorySchema);
};
//addd get original directory
fileService.prototype.getOriDirectory = function (success, failure) {
    var path = require('path');
    var root = path.dirname(require.main.filename);
    console.log(root);
    var json = JSON.parse(require('fs').readFileSync(root + '/service/Output.txt', 'utf8'));


    success(json);
};
//end
// addd remove file

fileService.prototype.removeFile = function (path, success, failure) {


    fs.unlink(path, function (err) {
        if (err) {
            failure(path + " not found");
            return console.log(err);}

        success(path + "removed");
    });

};
//end


module.exports = fileService;