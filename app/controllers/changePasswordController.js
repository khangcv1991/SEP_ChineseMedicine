scotchApp.controller('changePasswordController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $localStorage) {
        console.log("changePasswordController");
		$scope.userName = "";
        $scope.password = "";
        console.log($scope.username + "|" + $scope.password);

        $scope.usernameLabel = window.localStorage['currentUsername']
        console.log($localStorage);
        $scope.changePassword = function () {
            console.log("updateuser");
            
            dataFactory.changePassword(window.localStorage['currentUserID'], $scope.password).then(function (respone) {
                console.log(respone);
                if(respone.data.status == 200)
                    
                    delete window.localStorage['currentUsername'];
                    delete window.localStorage['currentUserID'];
                    delete window.localStorage['currentToken'];
                    delete window.localStorage['currentPermission'];
                    $http.defaults.headers.common.Authorization = '';
                    $rootScope.currentUserSignedIn = false;
                    $location.path('/login');

              
            });

        }
        
        return $scope.usernameLabel;

        


    }]);