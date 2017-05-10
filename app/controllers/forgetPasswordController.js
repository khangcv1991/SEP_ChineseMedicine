scotchApp.controller('forgetPasswordController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
         console.log("forgetPassword controller11");
        

        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.username = "";
        $scope.email = "";
        $scope.findPassword = function () {
            console.log($scope.email);
            dataFactory.findPassword($scope.username, $scope.email).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;

                
                $location.path('/login');
            }, function (error) {
                $scope.message = "Error";
            });

        };


    }]);