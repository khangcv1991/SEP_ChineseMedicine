scotchApp.controller('userController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("userController");
        $scope.users = [];
        dataFactory.getAllTempUsers().then(function (response) {
            console.log(response);
            $scope.users = response.data;
        })


    }]);