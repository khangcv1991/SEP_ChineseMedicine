scotchApp.controller('registerController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("registerController");
        
        $scope.username = "";
        $scope.password = "";
        $scope.permission = "";
        $scope.email = "";
        $scope.comment = "";
        $scope.register = function () {
            console.log($scope.username + "|" + $scope.password + "|" + $scope.email + "|" + $scope.permission + "|" + $scope.comment);

            dataFactory.register($scope.username, $scope.password, $scope.permission, $scope.email, $scope.comment).then(function (response) {
                console.log(response);
                // $scope.message = response.data.Status;

                $rootScope.currentUserSignedIn = false;
                $location.path('/login');
                window.location.reload();
            }, function (error) {
                $scope.message = "Invalid Username";
                window.alert("Invalid Username");
            });

        };


    }]);