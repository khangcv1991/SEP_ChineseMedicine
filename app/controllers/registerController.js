scotchApp.controller('registerController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("registerController");
        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.username = "";
        $scope.password = "";
        $scope.permission = "";
        $scope.email = "";
        $scope.comment = "";
        $scope.register = function () {
            console.log($scope.username + "|" + $scope.password + "|" + $scope.eamil + "|" + $scope.permission + "|" + $scope.comment);

            dataFactory.register($scope.username, $scope.password, $scope.permission, $scope.email, $scope.comment).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;

                $rootScope.currentUserSignedIn = false;
                $location.path('/login');
                window.location.reload();
            }, function (error) {
                $scope.message = "Error";
            });

        };


    }]);