scotchApp.controller('userAddController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("loginController");
        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.userName = "";
        $scope.password = "";
        $scope.permission = -1;
        $scope.doLogin = function () {
            console.log($scope.userName + "|" + $scope.password);


            dataFactory.addUser($scope.userName, $scope.password, $scope.permission).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;

                $rootScope.currentUserSignedIn = true;
                $location.path('/users');
            }, function (error) {
                $scope.message = "Error";
            });

        };


    }]);