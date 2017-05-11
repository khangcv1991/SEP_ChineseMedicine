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
            
            return $http.get(baseApiUrl + "/getRequestList");
        };

        dataFactory.getUsersCount = function () {
            
            
            return $http.get(baseApiUrl + "/getUsersCount");
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

        dataFactory.removeFile = function (bookID, type) {
            var data = {};
            data.id = bookID;
            data.type = type;
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/deleteFile', data);
        };

        dataFactory.getDetails = function (bookID, bookType) {
            var data = {};
            data.id = bookID
            data.type = bookType
            //data.count = 1;
            
            return $http.post(baseApiUrl + '/getFileDetail', data);
            

        };
        dataFactory.advancedSearch = function (choices) {
            data =  {
                "type":[],
                "keyword":[]
            };
            for (var i = 0; i < choices.length; i++)
            {
                console.log(choices[i].key);
                data.type[i] = choices[i].key;
                data.keyword[i] = choices[i].word;
            }
            console.log(data);
            //data.count = 1;
            
            return $http.post(baseApiUrl + '/advancedSearch', data);
            

        };

        dataFactory.andSearch = function (choices) {
            data =  {
                "type":[],
                "keyword":[]
            };
            for (var i = 0; i < choices.length; i++)
            {
                console.log(choices[i].key);
                data.type[i] = choices[i].key;
                data.keyword[i] = choices[i].word;
            }
            console.log(data);
            //data.count = 1;
            
            return $http.post(baseApiUrl + '/advancedSearchAnd', data);
            

        };

        dataFactory.edit = function (file,id,type) {
            
            
            var data = new FormData();
            data.append("id", id);
            data.append('type', type);
            data.append('file', file);
            console.log(data);
            //data.count = 1;
            
            // return $http.post(baseApiUrl + '/editFile', data);

            return $http({
                url: baseApiUrl + '/editFile',
                method: 'POST',
                data: data,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined},
                
            });
            

        };
        return dataFactory;
    }]);