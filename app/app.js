var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Constants = require("./common/app_constants");

var libs = process.cwd() + '/libs/';

/**
 * ATTENTION: THE LINE BELOW IS VERY IMPORTANT
 * it sets up the passport so tokens can be linked to users
 */
require(libs + 'auth/auth');
//====================

var config = require('./libs/config');
//var log = require('./libs/log')(module);
var oauth2 = require('./libs/auth/oauth2');
var passport = require('passport');

// Private Handlers
var _userRouter = require('./routes/userRouter');
var _shiftRouter = require('./routes/shiftRouter');
var _fileRouter = require('./routes/fileRouter');
var _todoRouter = require('./routes/todoRouter');

var app = express();

// view engine setup
app.set('port', process.env.PORT || Constants.LISTENING_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/generateData", function (request, response) {
    require(libs + 'model/generateData');
    console.log(request.headers);
    response.status(200).send({'Status': 'It works'});
});

// app.get('*', function(req, res) {
//     res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// ==== COMMON APIs ====
app.get("/api/time", function (req, res) {
    var now = new Date();
    res.json(
        {now: Math.round(now.getTime() / 1000)}
    );
});

// AUTHENTICATION
app.use('/api/users', _userRouter);
app.use('/api/login', oauth2.token);
// // Shift management
app.use('/api/shift', _shiftRouter);
// // File management
app.use('/api/file', _fileRouter);

// TODO
app.use('/api/todos', _todoRouter);

// ERROR HANDLING
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    //log.debug('%s %d %s', req.method, res.statusCode, req.url);
    console.log('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
    return;
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    //log.error('%s %d %s', req.method, res.statusCode, err.message);
    console.log('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
    return;
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
