/**
 *
 */
scotchApp.controller('userDetailController', ['$scope', '$stateParams', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'utilFactory', '$window',
    function ($scope, $stateParams, $location, $rootScope, $http, $cookies, dataFactory, utilFactory, $window) {
        var authorizationHeader = $cookies.get("AuthorizationHeader");

        $scope.message1 = "Shift: ";

        var subTitle = "Total hours for this shift: ";
        $scope.message2 = subTitle;

        if (authorizationHeader != null) {
            $http.defaults.headers.common['Authorization'] = authorizationHeader;
        } else {
            $location.path('/login');
        }
        // end
        console.log("this is user detail page" + $cookies.get("userEmail"));
        (function () {
            $scope.username = $cookies.get("userEmail");
            $scope.newpassword = "";
        })
        $scope.username = $cookies.get("userEmail");
        $scope.newpassword = "";

        $scope.coPassword = "";
        //add - update shift
        $scope.doSubmit = function (passo) {
            if ($scope.newpassword == "" || $scope.coPassword == "") {
                $window.alert("check new password!");
                return;
            }
            if ($scope.newpassword != $scope.coPassword) {
                $window.alert("check confirm password!");
                return;
            }
            var hash = md5($scope.newpassword);
            var userEmail = $cookies.get("userEmail");
            dataFactory.updateUser(hash, userEmail, $scope.username).then(function (response) {
                console.log("update password");
                console.log(response);

                $window.alert("update successfully");

            }, function (error) {
                $scope.message = "Error";
            });
        }
        //end


    }]);