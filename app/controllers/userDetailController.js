scotchApp.controller('userDetailController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("userController");
        var userId = $stateParams.userId;
        $scope.newPass = ""
        $scope.updateUser = function () {
            console.log("updateuser");
            dataFactory.updatePassword(userId, newPass).then(function (respone) {
                console.log(respone);
            })

        }
        $scope.removeUser = function () {
            console.log("removeUser");

        }

    }]);