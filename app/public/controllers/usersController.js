/**
 *
 */
scotchApp.controller('usersController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', '$filter', '$window',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $filter, $window) {

        (function () {
            console.log("currentUserSignedIn: " + $rootScope.currentUserSignedIn);
            //check authorization status for navigating
            var authorizationHeader = $cookies.get("AuthorizationHeader");
            if (authorizationHeader != null) {
                $http.defaults.headers.common['Authorization'] = authorizationHeader;
            } else {
                $location.path('/login');
            }
            //end
            $scope.workers = [];

            dataFactory.getAllWorkers().then(function (response) {
                console.log("worker data");
                console.log(response.data);
                $scope.workers = response.data;

            }, function (error) {
                $scope.message = "Error";
            });


        })();

        $scope.removeUser = function (_id) {
            dataFactory.removeUser(_id).then(function (response) {
                console.log("worker data");
                console.log(response.data);
                for (var i = 0; i < $scope.workers.length; i++) {
                    if (_id == $scope.workers[i]._id) {
                        $scope.workers.splice(i, 1);

                    }
                }
                $window.alert("remove successfully!");

            }, function (error) {
                $scope.message = "Error";
            });
        }

        // create a message to display in our view
        console.log("Home");
        $scope.message = 'This is a list of all the users';
        console.log($rootScope);


    }]);
