/**
 * Created by leonnguyen on 3/10/2016.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var db = require(libs + 'db/mongoose');
var Constants = require(process.cwd() + '/common/app_constants');
var ErrorCodes = require("../common/error_codes");

var ShiftService = require("../service/shiftService");
var _shiftService = new ShiftService();

//create a shift with workerId - current date
router.post('/', passport.authenticate('bearer', {session: false}), function (request, response) {
    // console.log(request.user);
    var senderId = request.user.username;
    if (senderId == null) {
        response.status(400).send(new ErrorCodes(ErrorCodes.USER_ID_MISSING));
    }
    else {
        var workerId = request.body["workerId"];
        var startTime = request.body["startTime"];
        var startImageLink = request.body["startImageLink"];
        console.log("WorkerId:" + workerId);

        _shiftService.createShift(senderId, workerId, startTime, startImageLink, function (createdShift) {
            response.json(createdShift);
        }, function (err_code) {
            response.status(400).send(err_code);
        });
    }
});
//add - removeShift
router.delete('/*', passport.authenticate('bearer', {session: false}), function (request, response) {
    var senderId = request.user.username;
    if (senderId == null) {
        response.status(400).send(new ErrorCodes(ErrorCodes.USER_ID_MISSING));
    }
    else if (request.params[0] != null) {
        var shiftId = request.params[0];
        _shiftService.removeShift(shiftId, function (removedShift) {
            response.json(removedShift);
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

//end
router.put('/*', passport.authenticate('bearer', {session: false}), function (request, response) {
    var senderId = request.user.username;
    if (senderId == null) {
        response.status(400).send(new ErrorCodes(ErrorCodes.USER_ID_MISSING));
    }
    else if (request.params[0] != null
        && request.body != null) {
        var shiftId = request.params[0];
        var action = request.body["action"];

        if (action == Constants.SHIFT_ACTION_END) {
            console.log("Ending shift");
            _shiftService.endShift(shiftId, function (updatedShift) {
                response.json(updatedShift);
            }, function (err_code) {
                response.status(400).send(err_code);
            });
        }
        else if (action == Constants.SHIFT_ACTION_UPDATE_IMAGE) {
            console.log("Update shift with image");
            var shift = request.body["shift"];
            _shiftService.updateShiftImage(shiftId, shift.startImageLink, shift.endImageLink, function (updatedShift) {
                response.json(updatedShift);
            }, function (err_code) {
                response.status(400).send(err_code);
            });
        } else if (action == Constants.SHIFT_ACTION_UPDATE_TIME) {
            //add - shift update time
            console.log("Update shift with time");
            var shift = request.body["shift"];
            _shiftService.updateShiftTimes(shiftId, shift.startTime, shift.endTime, function (updatedShift) {
                response.json(updatedShift);
            }, function (err_code) {
                response.status(400).send(err_code);
            });
        }
    }
    else {
        console.log(request.params.length);
        console.log(request.body);
        response.status(400).send(new ErrorCodes(ErrorCodes.ERROR_BAD_INPUT));
    }
});

router.get('/', passport.authenticate('bearer', {session: false}), function (request, response) {

    var status = request.query['Status'];
    var workerId = request.query['WorkerId'];
    var year = request.query['Year'];
    var week = request.query['Week'];

    _shiftService.allShifts(status, workerId, year, week, function (shifts) {
        response.json(shifts);
    }, function (err_code) {
        response.status(400).send(err_code);
    });
});

router.get('/*', passport.authenticate('bearer', {session: false}), function (request, response) {

    var shiftId = request.params[0];
    Date
    _shiftService.getShift(shiftId, function (shift) {
        response.json(shift);
    }, function (err_code) {
        response.status(500).send(new ErrorCodes(ErrorCodes.ERROR_UNKNOWN));
    });

});

module.exports = router;