/**
 * Created by admin on 29/4/17.
 */
/**
 *
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');
var Constants = require(process.cwd() + '/common/app_constants');
var ErrorCodes = require("../common/error_codes");

var FileService = require("../service/fileService");
var _fileService = new FileService();


router.get('/', function (request, response) {


    _fileService.getOriDirectory(function (data) {
        response.json(data);
    }, function (err_code) {
        response.status(400).send(err_code);
    });
});
router.get('/download', function (request, response) {

    console.log("get File API called!");
    var path = request.query['path'];
    response.sendFile(path, 'test.txt');
    // _fileService.getOriDirectory(function (data) {
    //     response.json(data);
    // }, function (err_code) n{
    //     response.status(400).send(err_code);
    // });
});

//add - remove file
router.post('/delete', passport.authenticate('bearer', {session: false}), function (request, response) {
    console.log("delete file called");
    var senderId = request.user.username;
    if (senderId == null) {
        response.status(400).send(new ErrorCodes(ErrorCodes.USER_ID_MISSING));
    }
    else {
        var path = request.body["path"];

        console.log("path:" + path);

        _fileService.removeFile(path, function (data) {
            response.json(data);
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }
});


module.exports = router;