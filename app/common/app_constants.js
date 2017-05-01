/**
 * Created by leonnguyen on 14/06/15.
 */

// ATTENTION: The order of the MongoDB has to be Heroku first, local later, otherwise it will crash the app on the Heroku server

module.exports = {
    FAITH_TOKEN: "c9b359951c09c5d04de4f852746671ab2b2d0994",
    HEADER_USER_ID_KEY: 'userid',
    DEV_ENVIRONMENT: "DEV",
    LISTENING_PORT: 3000,
    MONGODB_URL: process.env.MY_MONGOLAB_URI||'mongodb://localhost:27017/timeclock',

    MODEL_NAME_ADMIN: 'Admin',
    MODEL_NAME_WORKER: 'Worker',
    MODEL_NAME_STUDENT: 'Student',
    MODEL_NAME_SHIFT: 'Shift',
    MODEL_NAME_FILE: 'File',

    SHIFT_ACTION_END: 'End',
    SHIFT_ACTION_UPDATE_IMAGE: 'UpdateImage',
    SHIFT_ACTION_UPDATE_TIME: 'UpdateTime',

    STATUS_SHIFT_IS_CREATED: 'Created',
    STATUS_SHIFT_IS_COMPLETED: 'Completed',

    LIMIT_NUMBER_OF_COMPLETED_ORDER: 20,
    MESSAGE_COUNT_START:0,

    OBJECT_STATUS_CREATED: "IsCreated",
    OBJECT_STATUS_DELETE: "IsDeleted"
};

