scotchApp.controller('changePasswordController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $localStorage) {
        console.log("changePasswordController");
		$scope.userName = "";
        $scope.password = "";
        console.log($scope.username + "|" + $scope.password);

        $scope.usernameLabel = "Test";
        console.log($localStorage);
        $scope.changePassword = function () {
            console.log("updateuser");
            
            dataFactory.changePassword(userId, $scope.newPass).then(function (respone) {
                console.log(respone);
                if(respone.data.status == 200)
                    $location.path('/users');
                else
                    console.log("can not update");
            });

        }
        
        return $scope.usernameLabel;

        


    }]);