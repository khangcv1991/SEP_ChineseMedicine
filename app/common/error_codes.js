/**
 * Created by leon on 20/06/2015.
 */

ErrorCodes = function(errorCode){
    this.errorCode = errorCode;
    this.errorReason = ErrorCodes.getErrorReason(this.errorCode);
};

ErrorCodes.REGISTRATION_USER_EXISTS = 1000;
ErrorCodes.REGISTRATION_SELLER_EXISTS = 1001;
ErrorCodes.LOGIN_WRONG_PASSWORD = 1002;
ErrorCodes.LOGIN_USER_DOES_NOT_EXIST = 1003;

ErrorCodes.USER_ID_MISSING = 1004;

ErrorCodes.ERROR_DATABASE = 8000;
ErrorCodes.ERROR_OBJECT_NONEXISTING = 8001;

ErrorCodes.ERROR_BAD_INPUT = 9000;

ErrorCodes.ERROR_UNKNOWN = 9999;

ErrorCodes.getErrorReason = function(errorCode){
    var errStr;
    switch(errorCode){
        case ErrorCodes.REGISTRATION_USER_EXISTS:
            errStr = "User already exists";
            break;
        case ErrorCodes.REGISTRATION_SELLER_EXISTS:
            errStr = "Seller already exists";
            break;
        case ErrorCodes.LOGIN_WRONG_PASSWORD:
            errStr = "Username and password does not match";
            break;
        case ErrorCodes.LOGIN_USER_DOES_NOT_EXIST:
            errStr = "The user does not exist";
            break;
        case ErrorCodes.USER_ID_MISSING:
            errStr = "The user id is missing";
            break;
        case ErrorCodes.ERROR_DATABASE:
            errStr = "There is an issue with the database";
            break;
        case ErrorCodes.ERROR_OBJECT_NONEXISTING:
            errStr = "The object does not exist in the database";
            break;
        case ErrorCodes.ERROR_BAD_INPUT:
            errStr = "The request has bad input";
            break;
        default :
            errStr = "Something went wrong";
            break;
    }
    return errStr;
};

module.exports = ErrorCodes;