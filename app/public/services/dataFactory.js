/**
 *
 */
angular.module('scotchApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/';
        var baseApiUrl = '/api';
        var dataFactory = {};


        dataFactory.downloadFile = function (path) {
            return $http.get(baseApiUrl + '/file/download?path=' + path);
        };
        dataFactory.deleteFile = function (path) {
            var body = {"path": path};

            return $http.post(baseApiUrl + '/file/delete', body);
        };

        dataFactory.generateData = function () {
            return $http.get(baseApiUrl + '/file');
        };

        dataFactory.login = function (username, hashedPassword) {
            var body = {
                "grant_type": "password",
                "client_id": "android",
                "client_secret": "SomeRandomCharsAndNumbers",
                "username": username,
                "password": hashedPassword
            };
            console.log(body);
            return $http.post(baseApiUrl + '/login', body);
        };

        dataFactory.register = function (username, email, hashedPassword, phone, userType) {
            var body = {
                "password": hashedPassword,
                "email": email,
                "userFullName": username,
                "phone": phone,
                "address": "000",
                "userType": userType
            };
            console.log(body);
            return $http.post(baseApiUrl + '/users/register', body);
        };
        dataFactory.removeUser = function (userId) {

            console.log("removeUser: " + baseApiUrl + '/users/' + userId);
            return $http.delete(baseApiUrl + '/users/' + userId);
        };

        dataFactory.forgotPassword = function (email) {
            var body = {

                "email": email

            };
            console.log(body);
            return $http.post(baseApiUrl + '/forgot', body);
        };
        dataFactory.updateUser = function (password, email, uId) {
            var body = {
                "password": password,
                "email": email
            };
            console.log(body);
            return $http.put(baseApiUrl + '/users/' + uId, body);
        };
        //add get worker
        dataFactory.getAllWorkers = function () {
            return $http.get(baseApiUrl + "/users");
        };

        //end

        dataFactory.getAllWorkers = function () {
            return $http.get(baseApiUrl + "/users");
        };
        return dataFactory;

    }]);