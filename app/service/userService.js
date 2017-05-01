/**
 * Created by leonnguyen on 29/09/2016.
 */

var ErrorCodes = require("../common/error_codes");
var Constants = require("../common/app_constants");
var Utility = require("../common/utility");
var mongoose = require("mongoose");

var libs = process.cwd() + '/libs/';
var db = require(libs + 'db/mongoose');
var config = require(libs + 'config');
var User = require(libs + 'model/user');
var nodemailer = require('nodemailer');
var url = Constants.MONGODB_URL;

mongoose.connect(url);

UserService = function () {

};
//add - forgot password
UserService.prototype.forgotPass = function (email, success, failure) {

    User.find({"username": email}, function (err, users) {
        if (users.length == 0) {

            console.log("USERS EXIST");
            console.log("USERS EMAIL: " + users[0].username);
        }
        else {
            console.log("USERS EXIST");
            console.log("USERS EMAIL: " + users[0].username);


            failure(new ErrorCodes(ErrorCodes.REGISTRATION_USER_EXISTS));
        }
    });
};
//add - remove user
UserService.prototype.removeUser = function (uId, success, failure) {
    console.log("remove" + uId);
    User.findOneAndRemove({_id: uId}, function (findError, foundUser) {
        if (findError != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (foundUser == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {
            success(foundUser);

        }
    });
};


UserService.prototype.register = function (userRole, userFullName, email, password, phone, address, success, failure) {
    console.log("Useremail: " + email);
    User.find({"username": email}, function (err, users) {
        if (users.length == 0) {
            var user = new User({
                username: email,
                email: email,
                password: password,
                userType: userRole,
                fullName: userFullName
            });

            console.log("New user - %s:%s", user.username, user.password);
            user.save(function (err, user) {
                if (!err) {
                    //log.info("New user - %s:%s", user.username, user.password);
                    console.log("New user - %s:%s", user.username, user.password);
                    success(user);
                } else {
                    //return log.error(err);
                    console.log(err);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
        else {
            console.log("USERS EXIST");
            failure(new ErrorCodes(ErrorCodes.REGISTRATION_USER_EXISTS));
        }
    });
};

UserService.prototype.update = function (username, newPassword, isDisabled, success, failure) {

    User.find({"username": username}, function (err, users) {
        if (users.length == 1) {
            var user = users[0];

            console.log("user - %s:%s", user.username, user.password);

            if (newPassword != null) {
                user.password = newPassword;
            }
            if (isDisabled != null) {
                user.disabled = isDisabled;
            }
            user.email = username;
            user.save(function (err, user) {
                if (!err) {
                    //log.info("New user - %s:%s", user.username, user.password);
                    console.log("user:%s|newPassword:%s", user.username, user.password);
                    success(user);
                } else {
                    //return log.error(err);
                    console.log(err);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
        else {
            console.log("Something wrong");
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
    });
};

UserService.prototype.users = function (userId, userType, success, failure) {
    // console.log("UserType:" + userType);
    var that = this;
    var conditions = {};
    if (userType != null)
        conditions.userType = userType;
    if (userId != null) {
        conditions = {_id: userId};
    }
    console.log("UserID: " + userId);
    User.find(conditions, function (err, users) {
        success(users);
    });
};
//add get worker by id
UserService.prototype.user = function (workerId, success, failure) {
    console.log("UserID:" + workerId);
    var conditions = {_id: workerId};
    var that = this;
    User.find(conditions, function (err, user) {
        success(user);
    });
};

//end
exports.UserService = UserService;
