scotchApp.controller('loginController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $localStorage) {
        console.log("loginController");
        
        $scope.userName = "";
        $scope.password = "";
        
        
        $scope.doLogin = function () {

            dataFactory.login($scope.userName, $scope.password).then(function (response) {
                
                localStorage['currentUser'] = {}
                // $scope.message = response.data.Status;
                console.log(response.data)
                /*
                window.localStorage['currentUser'] = {
                    "token" : response.data['token'],
                    "username" : response.data['username'],
                    "permission" : response.data['permission'], 
                    "userID" : response.data['userID']
                }
                */
                window.localStorage['currentUser'].username = response.data['username']
                console.log(window.localStorage['currentUser']);
                //$cookies.put("AuthorizationHeader", true, null);
                $http.defaults.headers.common.Authorization = 'JWT ' + response.data['token'];
                
                $rootScope.currentUserSignedIn = true;
                $location.path('/');
            }, function (error) {
                $scope.message = "Invalid Username or Password";
            });

        };



    }]);