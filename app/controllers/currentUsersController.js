scotchApp.controller('currentUsersController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {

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

        $scope.users = [];
        dataFactory.getcurrentUsers().then(function (response) {

            console.log(response);
            $scope.users = response.data

            for (var i = 0; i < response.data.length; i++)
            {
                

                if (response.data[i][3] == true)
                {
                    $scope.users[i][3] = "Admin";
                }
                else if (response.data[i][4] == true)
                {
                    $scope.users[i][3] = "Staff";
                }
                else if (response.data[i][5] == true)
                {
                    $scope.users[i][3] = "Student";
                }
            }

            console.log($scope.users);
            
        })

        $scope.deleteCurrentUser = function (index) {

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

            console.log("deleteUser");
            console.log($scope.users[index][0]);
            userId = $scope.users[index][0];
            
            dataFactory.deleteCurrentUser(userId).then(function (respone) {
                console.log(respone);
                
                window.location.reload();
            });
        }


    }]);