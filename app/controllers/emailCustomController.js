scotchApp.controller('emailCustomController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $stateParams) {
	
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
	$scope.emailswitch = "ON";
	$scope.timeset = "1 DAY";

	$scope.change = function(){
		
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
		
		
		
		

       	// dataFactory.upload(file, title, $scope.studyID, $scope.studyRef, $scope.monograph, $scope.intervention, $scope.category,  $scope.studyDesgin, userID, type).then(function (response) {
            
        //     console.log(response);
            
        //     $location.path('/');
            

        // }, function (error) {
        //     $scope.message = "Error";
        // });

	}
}]);
