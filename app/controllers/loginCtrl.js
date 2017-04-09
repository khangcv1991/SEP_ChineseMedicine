scotchApp.controller('loginController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("loginController");
        $scope.message = 'Please login with your user name and password';
        $scope.userName = "";
        $scope.password = "";

        $scope.doLogin = function () {
            console.log($scope.userName + "|" + $scope.password);


            dataFactory.login($scope.userName, $scope.password).then(function (response) {
                console.log(response.data);
                // $scope.message = response.data.Status;
                var authorizationHeader = 'Bearer ' + response.data.access_token;
                console.log(response.data)
                $cookies.put("AuthorizationHeader", true, null);
                //$http.defaults.headers.common['Authorization'] = authorizationHeader;
                $rootScope.currentUserSignedIn = true;
                $location.path('/');
            }, function (error) {
                $scope.message = "Error";
            });

        };



    }]);