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

        dataFactory.getLogs = function () {
            
            return $http.get(baseApiUrl + "/getLogsList");
        };

        dataFactory.getUsersCount = function () {
            
            
            return $http.get(baseApiUrl + "/getRequestCount");
        };

        dataFactory.getcurrentUsers = function () {
            return $http.get(baseApiUrl + "/getUserList");
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

        dataFactory.register = function (username, password, permission, email, comment, firstname, lastname) {
            var data = {};
            
            console.log("test");

            data.username = username;
            data.password = password;
            data.permission = permission;
            data.email = email;
            data.comment = comment;
            data.first = firstname;
            data.last = lastname;

            console.log(baseApiUrl + "/register");
            return $http.post(baseApiUrl + "/register", data);
        };

        dataFactory.findPassword = function (username, email) {
            var data = {};
            
            data.username = username;
            data.email = email;
            console.log(data);



            return $http.post(baseApiUrl + "/forgetPassword", data);
        };

        dataFactory.addUser = function (username, password, email, firstname, lastname) {
            var data = {};
            data.username = username;
            data.password = password;
            data.email = email;
            data.first = firstname;
            data.last = lastname;
            console.log(data)


            return $http.post(baseApiUrl + "/addAdminUser", data);
        };

        dataFactory.deleteUser = function (userId) {
            var data = {};
            data.requestID = userId
            
            return $http.post(baseApiUrl + '/rejectRequest', data);
        };

        dataFactory.deleteCurrentUser = function (userId) {
            var data = {};
            data.userID = userId
            
            return $http.post(baseApiUrl + '/deleteUser', data);
        };

        dataFactory.doSearch = function (key,word) {
            var data = {};
            data.type = key;
            data.keyword = word;
            data.keyword = data.keyword.toUpperCase();
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/search', data);
        };

        dataFactory.view = function (bookID, type) {
            var data = {};
            data.id = bookID;
            data.type = type;

            //data.count = 1;
            

            return $http.post(baseApiUrl + '/viewFile', data);
        };

        dataFactory.download = function (bookID) {
            var data = {};
            data.id = bookID
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/downloadFile', data);
        };

        dataFactory.removeFile = function (bookID, type, userID) {
            var data = {};
            data.id = bookID;
            data.type = type;
            data.userID = userID;
            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/deleteFile', data);
        };

        dataFactory.recovery = function (logID) {
            var data = {};
            data.logID = logID;

            //data.count = 1;
            console.log(data);
            return $http.post(baseApiUrl + '/recoveryFile', data);
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
                data.keyword[i] = choices[i].word.toUpperCase();;
            }
            console.log(data);
            //data.count = 1;
            
            return $http.post(baseApiUrl + '/advancedSearchOr', data);
            

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
                data.keyword[i] = choices[i].word.toUpperCase();;
            }
            console.log(data);
            //data.count = 1;
            
            return $http.post(baseApiUrl + '/advancedSearchAnd', data);
            

        };

        dataFactory.edit = function (file,id,type, userID) {
            
            
            var data = new FormData();
            data.append("id", id);
            data.append('type', type);
            data.append('file', file);
            data.append('userID', userID);
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

        dataFactory.upload = function (file, title, studyID, studyRef, monograph, intervention, category, studyDesgin, userID, type) {
            
            
            var data = new FormData();

            data.append("title", title);
            data.append('type', type);
            data.append('file', file);
            data.append('studyID', studyID);
            data.append("studyRef", studyRef);
            data.append('monograph', monograph);
            data.append('intervention', intervention);
            data.append('category', category);
            data.append('studyDesgin', studyDesgin);
            data.append('userID', userID);

            return $http({
                url: baseApiUrl + '/addFile',
                method: 'POST',
                data: data,
                //assign content-type as undefined, the browser
                //will assign the correct boundary for us
                headers: { 'Content-Type': undefined},
                
            });
            

        };

        dataFactory.verifyToken = function() {

            var data = {

                "token": localStorage['currentToken']
            };

            return $http.post('http://127.0.0.1:8000/verifyToken', data);



            // a.then(function (response)
            // {
            //     console.log(response);

            // }, function(error){

            //     console.log(error);
            //     window.alert("Login is exipred");
            //     delete window.localStorage['currentUsername'];
            //     delete window.localStorage['currentUserID'];
            //     delete window.localStorage['currentToken'];
            //     delete window.localStorage['currentPermission'];
            //     delete window.localStorage['key'];
            //     delete window.localStorage['word'];
            //     delete window.localStorage['files'];
            //     delete window.localStorage['usersCount'];
            //     delete window.localStorage['currfiles'];
            //     delete window.localStorage['currchoices'];
            //     delete window.localStorage['searchType'];
            //     delete window.localStorage['searchKeyword'];
            //     $http.defaults.headers.common.Authorization = '';
            //     $rootScope.currentUserSignedIn = false;
            //     $rootScope.permission = ''; 

            // }); 

        }

        return dataFactory;
    }]);