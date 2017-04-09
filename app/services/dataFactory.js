/**
 * Created by leonnguyen on 19/02/2017.
 */
angular.module('scotchApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/';
        var baseApiUrl = '/api';
        var dataFactory = {};

        dataFactory.generateData = function () {
            return $http.get(urlBase + 'generateData');
        };

        dataFactory.login = function (username, Password) {
            // var body = {
            //     "grant_type": "password",
            //     "client_id": "android",
            //     "client_secret": "SomeRandomCharsAndNumbers",
            //     "username": username,
            //     "password": hashedPassword
            // };


            var body = {

                "username": username,
                "password": Password
            };

            return $http.post(baseApiUrl + '/login', body, {headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}});
        };

        dataFactory.getAllUsers = function () {
            return $http.get(baseApiUrl + "/getUserList");
        };


        dataFactory.updatePassword = function (userId, password) {
            console.log(baseApiUrl + "/changePassword");
            var data = {};
            data.userId = username;
            data.password = password;


            return $http.put(baseApiUrl + "/changePassword", data);
        };


        dataFactory.addUser = function (username, password, permission) {
            var data = {};
            data.username = username;
            data.password = password;
            data.permission = permission;
            return $http.post(urlBase + "/addUser", data);
        };


        dataFactory.deleteUser = function (username,adimkey) {
            var data = {};
            data.username = username;
            data.adimkey = adimkey;
            return $http.delete(urlBase + '/deleteUser', data);
        };



        return dataFactory;
    }]);