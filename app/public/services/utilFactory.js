/**
 *
 */
angular.module('scotchApp')
    .factory('utilFactory', ['$http', function ($http) {


        var utilFactory = {};

        utilFactory.DEFAULT_IMAGE = "img/Individual-Membership.png"
        utilFactory.PUNCHED_OUT_IMG = "https://s3-ap-northeast-1.amazonaws.com/timeclock/OUT-";
        utilFactory.PUNCHED_IN_IMG = "https://s3-ap-northeast-1.amazonaws.com/timeclock/IN-";
        utilFactory.DATE_FORMAT = "MM/DD/YY HH:MM a";
        utilFactory.DATE_FORMAT2 = "MM/DD/YY";
        utilFactory.getWorkHours = function (strStartTime, strEndTime) {
            var startTime = utilFactory.getDateFromString(strStartTime);
            var endTime = utilFactory.getDateFromString(strEndTime);

            return (endTime.valueOf() - startTime.valueOf()) / (60 * 60 * 1000);
        }


        utilFactory.getDateFromString = function (strDate) {
            var outDate = moment(strDate, "MM/DD/YY hh:mm a");
            return outDate;
        };


        utilFactory.formatDate = function (dateVal) {
            var curDate = new moment(dateVal).format(utilFactory.DATE_FORMAT);
            return curDate;

        };
        //end

        utilFactory.isThisWeek = function (longDate) {
            var now = new moment();
            var iDate = new moment(longDate);

            return now.isoWeek() == iDate.isoWeek();
        };

        utilFactory.weekIndex = function (longDate) {

            var iDate = new moment(longDate);

            return iDate.isoWeek();
        };


        //return Date object
        utilFactory.firstDayOfWeek = function (week, year) {

            if (year == null) {
                year = (new Date()).getFullYear();
            }

            var date = utilFactory.firstWeekOfYear(year),
                weekTime = utilFactory.weeksToMilliseconds(week),
                targetTime = date.getTime() + weekTime;

            return date.setTime(targetTime);

        }

        utilFactory.weeksToMilliseconds = function (weeks) {
            return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
        }

        utilFactory.firstWeekOfYear = function (year) {
            var date = new Date();
            date = utilFactory.firstDayOfYear(date, year);
            date = utilFactory.firstWeekday(date);
            return date;
        }

        utilFactory.firstDayOfYear = function (date, year) {
            date.setYear(year);
            date.setDate(1);
            date.setMonth(0);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        }
        utilFactory.firstWeekday = function (firstOfJanuaryDate) {
            // 0 correspond au dimanche et 6 correspond au samedi.
            var FIRST_DAY_OF_WEEK = 1; // Monday, according to iso8601
            var WEEK_LENGTH = 7; // 7 days per week
            var day = firstOfJanuaryDate.getDay();
            day = (day === 0) ? 7 : day; // make the days monday-sunday equals to 1-7 instead of 0-6
            var dayOffset = -day + FIRST_DAY_OF_WEEK; // dayOffset will correct the date in order to get a Monday
            if (WEEK_LENGTH - day + 1 < 4) {
                // the current week has not the minimum 4 days required by iso 8601 => add one week
                dayOffset += WEEK_LENGTH;
            }
            return new Date(firstOfJanuaryDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
        }

        return utilFactory;
    }]);