scotchApp.controller('currentUsersController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("currentUsersController");
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

            console.log("deleteUser");
            console.log($scope.users[index][0]);
            userId = $scope.users[index][0];
            
            dataFactory.deleteCurrentUser(userId).then(function (respone) {
                console.log(respone);
                
                window.location.reload();
            });
        }


    }]);