scotchApp.controller('userController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("userController");

        $scope.users = [];
        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        dataFactory.verifyToken().then(function (response)
        {
            console.log(response);

        }, function(error){

            console.log(error);
            window.alert("Login is exipred");
            delete window.localStorage['currentUsername'];
            delete window.localStorage['currentUserID'];
            delete window.localStorage['currentToken'];
            delete window.localStorage['currentPermission'];
            delete window.localStorage['key'];
            delete window.localStorage['word'];
            delete window.localStorage['files'];
            delete window.localStorage['usersCount'];
            delete window.localStorage['currfiles'];
            delete window.localStorage['currchoices'];
            delete window.localStorage['searchType'];
            delete window.localStorage['searchKeyword'];
            $http.defaults.headers.common.Authorization = '';
            $rootScope.currentUserSignedIn = false;
            $rootScope.permission = ''; 
            $location.path('/login');

        }); 

        dataFactory.getAllUsers().then(function (response) {
            
            var index
            for (index = 0; index < response.data.length; ++index) {
                if (response.data[index][2] == 2)
                {
                    response.data[index][2] = "Staff";
                }
                else if (response.data[index][2] == 3)
                {
                    response.data[index][2] = "Student";
                }
                
            };
            $scope.users = response.data;
            console.log($scope.users);

        }, function(error){
            console.log(error.status);
        })

       

        $scope.removeUser = function (index) {

            dataFactory.verifyToken().then(function (response)
            {
                console.log(response);

            }, function(error){

                console.log(error);
                window.alert("Login is exipred");
                delete window.localStorage['currentUsername'];
                delete window.localStorage['currentUserID'];
                delete window.localStorage['currentToken'];
                delete window.localStorage['currentPermission'];
                delete window.localStorage['key'];
                delete window.localStorage['word'];
                delete window.localStorage['files'];
                delete window.localStorage['usersCount'];
                delete window.localStorage['currfiles'];
                delete window.localStorage['currchoices'];
                delete window.localStorage['searchType'];
                delete window.localStorage['searchKeyword'];
                $http.defaults.headers.common.Authorization = '';
                $rootScope.currentUserSignedIn = false;
                $rootScope.permission = ''; 
                $location.path('/login');

            }); 

            console.log("removeUser");
            console.log($scope.users[index][0]);
            userId = $scope.users[index][0];
            
            dataFactory.deleteUser(userId).then(function (respone) {
                console.log(respone);
                window.localStorage['usersCount'] = window.localStorage['usersCount'] - 1;
                $location.path('/users');
                window.location.reload();
            })
        };

        $scope.addUser = function (index) {

            dataFactory.verifyToken().then(function (response)
            {
            console.log(response);

            }, function(error){

                console.log(error);
                window.alert("Login is exipred");
                delete window.localStorage['currentUsername'];
                delete window.localStorage['currentUserID'];
                delete window.localStorage['currentToken'];
                delete window.localStorage['currentPermission'];
                delete window.localStorage['key'];
                delete window.localStorage['word'];
                delete window.localStorage['files'];
                delete window.localStorage['usersCount'];
                delete window.localStorage['currfiles'];
                delete window.localStorage['currchoices'];
                delete window.localStorage['searchType'];
                delete window.localStorage['searchKeyword'];
                $http.defaults.headers.common.Authorization = '';
                $rootScope.currentUserSignedIn = false;
                $rootScope.permission = ''; 
                $location.path('/login');

            });  
               
            console.log($scope.userName + "|" + $scope.password);

            console.log($scope.users[index]);

            dataFactory.acceptUser($scope.users[index]).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;
                window.localStorage['usersCount'] = window.localStorage['usersCount'] - 1;
                $rootScope.currentUserSignedIn = true;
                $location.path('/users');
                window.location.reload();
            }, function (error) {
                $scope.message = "Error";
            });

        };

    }]);

