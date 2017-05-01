var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');
var Constants = require(process.cwd() + '/common/app_constants');
var ErrorCodes = require("../common/error_codes");

var UserService = require(process.cwd() + "/service/userService").UserService;
var _userService = new UserService();

var ShiftService = require("../service/shiftService");
var _shiftService = new ShiftService();

router.get('/info', passport.authenticate('bearer', {session: false}),
    function (request, response) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        response.json({
            user_id: request.user.userId,
            name: request.user.username,
            userType: request.user.userType,
            scope: request.authInfo.scope
        });
    }
);

router.get('/', passport.authenticate('bearer', {session: false}), function (request, response) {
    var userType = request.query['userType'];
    var isActive = request.query["active"];
    var userId = request.query['userId'];
    console.log("request: " + request);
    console.log(": " + userId);
    _userService.users(userId, userType, function (users) {
        if (isActive == null) {
            response.json(users);
        } else if (userId != null) {
            response.json(users);
        }
        else {
            isActive = JSON.parse(isActive.toLocaleLowerCase());

            _shiftService.allShifts(Constants.STATUS_SHIFT_IS_CREATED, null, null, null, function (shifts) {

                var workerIds = [];

                for (var i = 0, len = shifts.length; i < len; i++) {
                    var shift = shifts[i];
                    workerIds.push(shift.workerId);
                }

                var qualifiedWorkers = [];
                for (var i = 0, len = users.length; i < len; i++) {
                    var user = users[i];
                    if (isActive) {
                        if (workerIds.indexOf(user.username) > -1) {
                            qualifiedWorkers.push(user);
                        }
                    }
                    else {
                        if (workerIds.indexOf(user.username) == -1) {
                            qualifiedWorkers.push(user);
                        }
                    }
                }

                response.json(qualifiedWorkers);

            }, function (err_code) {
                response.status(400).send(err_code);
            });
        }
    });
});

router.put('/*', passport.authenticate('bearer', {session: false}), function (request, response) {
    console.log("request update ");
    if (request.params[0] != null
        && request.body != null) {


        var userId = request.params[0];
        var newPassword = request.body["password"];
        var username = request.body["email"];
        var isDisabled = request.body["disabled"];
        console.log("userId: " + userId);
        console.log("username: " + username);
        console.log("newPassword: " + newPassword);

        _userService.update(username, newPassword, isDisabled, function (user) {
            response.json(user);
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }
});

router.post('/registerAdmin', function (request, response) {

    var faithToken = request.body["faithToken"];
    if (faithToken != Constants.FAITH_TOKEN) {
        response.status(400).send(new ErrorCodes(ErrorCodes.ERROR_BAD_INPUT));
    }
    else {
        var userFullName = request.body.userFullName;
        var email = request.body.email;
        var password = request.body.password;
        var phone = request.body.phone;
        var address = request.body.address;
        _userService.register(Constants.MODEL_NAME_ADMIN, userFullName, email, password, phone, address, function (user) {
            response.json({"username": user.username});
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }
});

router.post('/forgotPassword', function (request, response) {

    var faithToken = request.body["faithToken"];
    if (faithToken != Constants.FAITH_TOKEN) {
        response.status(400).send(new ErrorCodes(ErrorCodes.ERROR_BAD_INPUT));
    }
    else {

        var email = request.body.email;

        _userService.forgotPass(email,  function (data) {
            response.json(data);
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }
});

router.post('/register', function (request, response) {

    var userFullName = request.body.userFullName;
    var email = request.body.email;
    var password = request.body.password;
    var phone = request.body.phone;
    var address = request.body.address;
    var userType = request.body.userType;
    _userService.register(userType, userFullName, email, password, phone, address, function (user) {
        response.json({"username": user.username});
    }, function (err_code) {
        response.status(400).send(err_code);
    });

});

//add - forgot password
router.post('/forgot', function (request, response) {
    console.log("forgot API called")
    var email = request.body.email;

    _userService.forgotPass(email, function (response) {
        response.json(response);
    }, function (err_code) {
        response.status(400).send(err_code);
    });

});

//add - removeUser
router.delete('/*', passport.authenticate('bearer', {session: false}), function (request, response) {
    var senderId = request.user.username;
    console.log("remove" + senderId);
    if (senderId == null) {
        console.log("Use missing");
        response.status(400).send(new ErrorCodes(ErrorCodes.USER_ID_MISSING));
    }
    else if (request.params[0] != null) {
        var userId = request.params[0];
        _userService.removeUser(userId, function (removedUser) {
            console.log("UserId" + userId);
            response.json(removedUser);
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }

    else {
        console.log(request.params.length);
        console.log(request.body);
        response.status(400).send(new ErrorCodes(ErrorCodes.ERROR_BAD_INPUT));

    }
});


module.exports = router;
