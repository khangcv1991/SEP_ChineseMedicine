/**
 *
 */
scotchApp.controller('loginController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("loginController");
        $scope.message = 'Please login with your user name and password';
        $scope.userName = "";
        $scope.password = "";

        $scope.doLogin = function () {
            console.log($scope.userName + "|" + $scope.password);

            var hash = md5($scope.password);
            console.log(hash);

            dataFactory.login($scope.userName, hash).then(function (response) {

                var authorizationHeader = 'Bearer ' + response.data.access_token;
                console.log(response.data)
                $cookies.put("AuthorizationHeader", authorizationHeader, null);
                $cookies.put("userEmail", $scope.userName);
                $cookies.put("userType", response.data.userType);
                if (response.data.userType == "Admin") {
                    $rootScope.isAdmin = true;
                    $rootScope.isWorker = true;
                }
                if (response.data.userType == "Worker") {
                    $rootScope.isAdmin = false;
                    $rootScope.isWorker = true;
                }
                if (response.data.userType == "Student"){
                    $rootScope.isAdmin = false;
                    $rootScope.isWorker = false;
                }
                console.log("username: " + $cookies.get("userEmail"));

                $http.defaults.headers.common['Authorization'] = authorizationHeader;
                $rootScope.currentUserSignedIn = true;
                $location.path('/');
            }, function (error) {
                $scope.message = "Error";
            });

        };

        $scope.test = function () {

            console.log("Test");

            $http.get("/generateData").then(function (response) {
                console.log(response);
                $scope.message = response.data.Status;
            });
        };

    }]);