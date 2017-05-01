/**
 * Created by leonnguyen on 13/02/2017.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');
var Constants = require(process.cwd() + '/common/app_constants');
var ErrorCodes = require("../common/error_codes");

console.log("Todo Router");

router.get('/', function(request, response){

    var todos = [
        {
            _id: 1,
            text: "Test1",
            done: true
        },
        {
            _id: 2,
            text: "Test2",
            done: true
        }
    ];
    response.json(todos);

});

router.post('/', function(request, response){
    // console.log(request.user);
    var todos = [
        {
            _id: 1,
            text: "Test1",
            done: true
        },
        {
            _id: 2,
            text: "Test2",
            done: true
        },
        {
            _id: 3,
            text: "Test3",
            done: false
        }
    ];
    response.json(todos);
});

router.delete('/*', function(request, response){
    var todoId = request.params[0];
    console.log(todoId);
    var todos = [
        {
            _id: 1,
            text: "Test1",
            done: true
        },
        {
            _id: 2,
            text: "Test2",
            done: true
        }
    ];
    response.json(todos);
});

module.exports = router;