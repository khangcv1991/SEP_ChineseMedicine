scotchApp.controller('uploadController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $stateParams) {
	
	$scope.upFile = {};
	$scope.filetype = "PDF";
	$scope.upload = function(file){
		
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

