/**
 * Created by leonnguyen on 3/10/2016.
 */
var ErrorCodes = require("../common/error_codes");
var Constants = require("../common/app_constants");
var Mongoose = require("mongoose");
var Utility = require("../common/utility");
ShiftService = function () {

    this.privateMongoose = Mongoose.createConnection(Constants.MONGODB_URL);

    var Schema = Mongoose.Schema;

    var ShiftSchema = new Schema({
        workerId: String,
        creatorId: String,
        startTime: Number,
        endTime: Number,
        startImageLink: String,
        endImageLink: String,
        status: String
    });

    this.privateModel = this.privateMongoose.model(Constants.MODEL_NAME_SHIFT, ShiftSchema);
};
//addd remove shift
ShiftService.prototype.removeShift = function (shiftId, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    Shift.findOneAndRemove({_id:shiftId}, function (findError, foundShift) {
        if (findError != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (foundShift == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {
            success(foundShift);

        }
    });
};
//end

//addd updateShiftTimes
ShiftService.prototype.updateShiftTimes = function (shiftId, startTime, endTime, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    Shift.findOne({_id: shiftId}, function (findError, foundShift) {
        if (findError != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (foundShift == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {

            if (startTime != null) {
                foundShift.startTime = startTime;
            }
            if (endTime != null) {
                foundShift.endTime = endTime;
            }

            foundShift.save(function (saveError, updatedShift) {
                if (saveError == null) {
                    console.log(updatedShift);
                    success(updatedShift);
                }
                else {
                    console.log(saveError);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
    });
};
//end
ShiftService.prototype.updateShiftImage = function (shiftId, startImageLink, endImageLink, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    Shift.findOne({_id: shiftId}, function (findError, foundShift) {
        if (findError != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (foundShift == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {

            if (startImageLink != null) {
                foundShift.startImageLink = startImageLink;
            }
            if (endImageLink != null) {
                foundShift.endImageLink = endImageLink;
            }

            foundShift.save(function (saveError, updatedShift) {
                if (saveError == null) {
                    console.log(updatedShift);
                    success(updatedShift);
                }
                else {
                    console.log(saveError);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
    });
};

ShiftService.prototype.endShift = function (shiftId, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    Shift.findOne({_id: shiftId}, function (findError, foundShift) {
        if (findError != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (foundShift == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {

            foundShift.endTime = Math.round((new Date()).getTime() / 1000);
            foundShift.status = Constants.STATUS_SHIFT_IS_COMPLETED;

            foundShift.save(function (saveError, updatedShift) {
                if (saveError == null) {
                    console.log(updatedShift);
                    success(updatedShift);
                }
                else {
                    console.log(saveError);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
    });
};
// insert a new shift

ShiftService.prototype.createShift = function (creatorId, workerId, startTime, startImageLink, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    var conditions = {
        workerId: workerId,
        startTime: {$ne: null},
        endTime: null
    };

    Shift.find(conditions).exec(function (err, shifts) {
        console.log(shifts);
        if (err) {
            // handle result
            console.error(err);
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        } else if (shifts.length > 0) {
            success(shifts[0]);
        }
        else {
            var newShift = new that.privateModel();
            newShift.creatorId = creatorId;
            newShift.workerId = workerId;
            if (startTime == null) {
                newShift.startTime = (new Date()).valueOf();
            }
            else {
                newShift.startTime = startTime;
            }

            if (startImageLink != null) {
                newShift.startImageLink = startImageLink;
            }
            newShift.status = Constants.STATUS_SHIFT_IS_CREATED;

            // console.log(newShift);
            newShift.save(function (err, createdShift) {
                if (err == null) {
                    // console.log(createdShift);
                    success(createdShift);
                }
                else {
                    console.log(err);
                    failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
                }
            });
        }
    });
};

ShiftService.prototype.allShifts = function (shiftStatus, workerId, year, week, success, failure) {
    var that = this;

    var Shift = that.privateModel;
    //fix getAllShift without pass shiftStatus
    //var conditions = {status: shiftStatus};
    var conditions = {};
    if (shiftStatus != null) {
        conditions = {status: shiftStatus};
    }
    //end

    if (workerId != null) {
        conditions.workerId = workerId;
        console.log("conditions.workerId " + workerId);
    }
    //console.log(lowerBound.valueOf());
    if (year == null) {
        year = new Date().getFullYear();
    }

    //end
    if (year != null && week != null) {
        console.log("Year: " + year + ", Week: " + week);
        //Fist day and Last day of a week
        var firstWDay = Utility.firstDayOfWeek(week, year) / 1000;

        var lastWDay = firstWDay + 60 * 60 * 24 * 7;
        var upperBound = new Date(lastWDay);
        var lowerBound = new Date(firstWDay);
        console.log(firstWDay + " ---- " + lastWDay);
        conditions.startTime = {
            $gte: lowerBound.valueOf(),
            $lte: upperBound.valueOf()
        };
    }
    console.log(conditions);
    Shift.find(conditions)
        .sort({startTime: 1})
        .exec(function (err, shifts) {
            console.log(shifts);
            if (err) {
                // handle result
                console.error(err);
                failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
            } else {
                success(shifts);
            }
        });
};

ShiftService.prototype.getShift = function (shiftId, success, failure) {
    var that = this;

    var Shift = that.privateModel;

    Shift.findOne({_id: shiftId}, function (error, shift) {
        if (error != null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_DATABASE));
        }
        else if (shift == null) {
            failure(new ErrorCodes(ErrorCodes.ERROR_OBJECT_NONEXISTING));
        }
        else {
            success(shift);
        }
    });
};

module.exports = ShiftService;