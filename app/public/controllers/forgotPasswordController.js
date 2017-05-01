/**
 *
 */
scotchApp.controller('forgotPassword', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("loginController");
        $scope.message = 'Please login with your user name and password';
        $scope.email = "";


        $scope.doSubmit = function () {
            console.log("Forget password");

            dataFactory.forgotPassword($scope.email).then(function (response) {

                $location.path('/login');
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