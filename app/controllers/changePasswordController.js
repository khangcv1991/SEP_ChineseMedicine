scotchApp.controller('changePasswordController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $localStorage) {
        console.log("changePasswordController");

        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        dataFactory.verifyToken().then(function (response)
        {
            console.log(response);

        }, function(error){

            console.log(error);
            window.alert("Login is exipred");
            delete window.localStorage['currentUsername'];
            delete window.localStorage['currentUserID'];
            delete window.localStorage['currentToken'];
            delete window.localStorage['currentPermission'];
            delete window.localStorage['key'];
            delete window.localStorage['word'];
            delete window.localStorage['files'];
            delete window.localStorage['usersCount'];
            delete window.localStorage['currfiles'];
            delete window.localStorage['currchoices'];
            delete window.localStorage['searchType'];
            delete window.localStorage['searchKeyword'];
            $http.defaults.headers.common.Authorization = '';
            $rootScope.currentUserSignedIn = false;
            $rootScope.permission = ''; 
            $location.path('/login');

        }); 

		$scope.userName = "";
        $scope.password = "";
        console.log($scope.username + "|" + $scope.password);

        $scope.usernameLabel = window.localStorage['currentUsername']
        
        $scope.changePassword = function () {
            console.log("updateuser");

            dataFactory.verifyToken().then(function (response)
            {
                console.log(response);

            }, function(error){

                console.log(error);
                window.alert("Login is exipred");
                delete window.localStorage['currentUsername'];
                delete window.localStorage['currentUserID'];
                delete window.localStorage['currentToken'];
                delete window.localStorage['currentPermission'];
                delete window.localStorage['key'];
                delete window.localStorage['word'];
                delete window.localStorage['files'];
                delete window.localStorage['usersCount'];
                delete window.localStorage['currfiles'];
                delete window.localStorage['currchoices'];
                delete window.localStorage['searchType'];
                delete window.localStorage['searchKeyword'];
                $http.defaults.headers.common.Authorization = '';
                $rootScope.currentUserSignedIn = false;
                $rootScope.permission = ''; 
                $location.path('/login');

            }); 
            
            dataFactory.changePassword(window.localStorage['currentUserID'], $scope.password).then(function (respone) {
                

                if(respone.data.status == 200)
                    
                    delete window.localStorage['currentUsername'];
                    delete window.localStorage['currentUserID'];
                    delete window.localStorage['currentToken'];
                    delete window.localStorage['currentPermission'];
                    delete window.localStorage['key'];
                    delete window.localStorage['word'];
                    delete window.localStorage['files'];
                    delete window.localStorage['usersCount'];
                    delete window.localStorage['currfiles'];
                    delete window.localStorage['currchoices'];
                    delete window.localStorage['searchType'];
                    delete window.localStorage['searchKeyword'];
                    console.log($rootScope);
                    $http.defaults.headers.common.Authorization = '';
                    $rootScope.currentUserSignedIn = false;
                    $rootScope.permission = '';
                    $location.path('/login');
              
            });

        }
        
        return $scope.usernameLabel;

        


    }]);