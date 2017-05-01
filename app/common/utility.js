/**
 * Created by leon on 20/06/2015.
 */

Utility = function () {

};

Utility.randomString = function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};

//return Date object
Utility.firstDayOfWeek = function (week, year) {

    if (year == null) {
        year = (new Date()).getFullYear();
    }

    var date = Utility.firstWeekOfYear(year),
        weekTime = Utility.weeksToMilliseconds(week),
        targetTime = date.getTime() + weekTime;

    return date.setTime(targetTime);

}

Utility.weeksToMilliseconds = function (weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
}

Utility.firstWeekOfYear = function (year) {
    var date = new Date();
    date = Utility.firstDayOfYear(date, year);
    date = Utility.firstWeekday(date);
    return date;
}

Utility.firstDayOfYear = function (date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
Utility.firstWeekday = function (firstOfJanuaryDate) {
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

module.exports = Utility;