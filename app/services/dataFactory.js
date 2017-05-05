/**
 * Created by leonnguyen on 19/02/2017.
 */
angular.module('scotchApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = 'http://127.0.0.1:8000';
        var baseApiUrl = 'http://127.0.0.1:8000';
        var dataFactory = {};

        dataFactory.generateData = function () {
            return $http.get(urlBase + 'generateData');
        };

        dataFactory.login = function (username, password) {
            // var body = {
            //     "grant_type": "password",
            //     "client_id": "android",
            //     "client_secret": "SomeRandomCharsAndNumbers",
            //     "username": username,
            //     "password": hashedPassword
            // };


            var body = {

                "username": username,
                "password": password
            };

            return $http.post(baseApiUrl + '/api-token-auth', body )

        };

        dataFactory.getAllUsers = function () {
            console.log(baseApiUrl + "/getRequestList");
            var data = {};
            return $http.get(baseApiUrl + "/getRequestList");
        };

        dataFactory.getAllTempUsers = function () {
            return $http.get(baseApiUrl + "/getRequestList");
        };

        dataFactory.changePassword = function (userId, password) {
            
            var data = {};
            data.userID = userId;
            data.password = password;

            console.log(data);
            return $http.post(baseApiUrl + "/changePassword", data);
        };


        dataFactory.acceptUser = function (user) {
            var data = {};
            data.username = user[1];
            data.password = user[5];
            data.permission = user[2];
            data.email = user[4];
            data.comment = user[3];
            data.requestID = user[0];
            console.log(data);
            
            return $http.post(baseApiUrl + "/acceptRequest", data);
        };

        dataFactory.register = function (username, password, permission, email, comment) {
            var data = {};
            
            data.username = username;
            data.password = password;
            data.permission = permission;
            data.email = email;
            data.comment = comment;


            return $http.post(baseApiUrl + "/register", data);
        };

        dataFactory.findPassword = function (username, email) {
            var data = {};
            
            data.username = username;
            data.email = email;
            console.log(data);



            return $http.post(baseApiUrl + "/forgetPassword", data);
        };

        dataFactory.addUser = function (username, password, email) {
            var data = {};
            data.username = username;
            data.password = password;
            data.email = email;
            
            console.log(data)


            return $http.post(baseApiUrl + "/addAdminUser", data);
        };

        dataFactory.deleteUser = function (userId,adimkey) {
            var data = {};
            data.requestID = userId
            data.adimkey = adimkey;
            console.log(data.requestID);
            return $http.post(baseApiUrl + '/rejectRequest', data);
        };

        dataFactory.doSearch = function (key,word) {
            var data = {};
            data.type = key
            data.keyword = word;
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/search', data);
        };

        dataFactory.view = function (bookID) {
            var data = {};
            data.id = bookID
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/viewFile', data);
        };

        dataFactory.download = function (bookID) {
            var data = {};
            data.id = bookID
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/downloadFile', data);
        };

        dataFactory.removeFile = function (bookID) {
            var data = {};
            data.id = bookID
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/DeleteFile', data);
        };

        return dataFactory;
    }]);