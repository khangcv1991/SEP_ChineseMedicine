/**
 *
 */
scotchApp.controller('registerController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("registerController");
        $scope.message = 'Register form';
        $scope.userName = "";
        $scope.password = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.userType = "";

        $scope.doRegister = function () {
            console.log($scope.userName + "|" + $scope.password);

            var hash = md5($scope.password);
            console.log(hash);

            dataFactory.register($scope.userName,$scope.email, hash,  $scope.phone, $scope.userType).then(function (response) {


                $location.path('/login');
            }, function (error) {
                $scope.message = "Error";
            });

        };



    }]);