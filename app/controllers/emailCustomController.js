scotchApp.controller('emailCustomController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $stateParams) {
	
	
	$scope.emailswitch = "ON";
	$scope.timeset = "1 DAY";

	$scope.change = function(){
		
		
		
		
		

       	// dataFactory.upload(file, title, $scope.studyID, $scope.studyRef, $scope.monograph, $scope.intervention, $scope.category,  $scope.studyDesgin, userID, type).then(function (response) {
            
        //     console.log(response);
            
        //     $location.path('/');
            

        // }, function (error) {
        //     $scope.message = "Error";
        // });

	}
}]);
