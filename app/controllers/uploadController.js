scotchApp.controller('uploadController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
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

	$scope.upFile = {};
	$scope.filetype = "PDF";
	$scope.upload = function(file){

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
		
		console.log(file);

		if (!file)
		{
			window.alert("Empty file");
			return;
		}

		userID = window.localStorage['currentUserID'];
		type = (file.name.split('.')[1]);
		title = (file.name.split('.')[0]);
		
		

       	dataFactory.upload(file, title, $scope.studyID, $scope.studyRef, $scope.monograph, $scope.intervention, $scope.category,  $scope.studyDesgin, userID, type).then(function (response) {
            
            console.log(response);
            
            $location.path('/');
            

        }, function (error) {
            $scope.message = "Error";
        });

	}
}]);

