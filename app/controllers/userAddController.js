scotchApp.controller('userAddController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
         console.log("add user controller11");

        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.username = "";
        $scope.password = "";
        $scope.email = "";
        $scope.addUser = function () {
            console.log("add user function11");
            dataFactory.addUser($scope.username, $scope.password, $scope.email, $scope.firstname, $scope.lastname).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;

                
                $location.path('/users');
                window.location.reload();
            }, function (error) {
                $scope.message = "Error";
            });

        };


    }]);