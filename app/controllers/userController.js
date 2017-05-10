scotchApp.controller('userController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("userController");
        $scope.users = [];
        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
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
                
            }
            $scope.users = response.data;

        })
        
        $scope.removeUser = function (index) {

            console.log("removeUser");
            console.log($scope.users[index][0]);
            userId = $scope.users[index][0];
            var adminKey = $cookies.get("adminKey");
            dataFactory.deleteUser(userId, adminKey).then(function (respone) {
                console.log(respone);
                window.localStorage['usersCount'] = window.localStorage['usersCount'] - 1;
                $location.path('/users');
                window.location.reload();
            })
        }

        $scope.addUser = function (index) {
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

