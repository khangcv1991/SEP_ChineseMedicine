scotchApp.controller('uploadController', ['$scope', 'multipartForm', function($scope, multipartForm){
	$scope.upFile = {};
	$scope.upload = function(){
		var uploadUrl = '/upload';
		multipartForm.post(uploadUrl, $scope.upFile);
	}
}]);

