scotchApp.controller('editController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $stateParams) {
        

        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        console.log('edit')
        console.log($stateParams);
        var deta = localStorage.getItem("fileDetail")
        var detail = JSON.parse(deta)
        console.log(detail.title)

        baseUrl = 'localhost';
        $scope.title = detail.title;
        $scope.studyID = detail.studyID;
        $scope.studyReference = detail.studyReference;
        $scope.category = detail.category;
        $scope.fileType = detail.fileType;
        $scope.monograph = detail.monograph;
        $scope.modification = detail.modification;
        $scope.intervention = detail.intervention;
        $scope.id = detail.id;
        $scope.path = detail.path;


        
        $scope.edit = function (file) {
            
            
            console.log(file);
            dataFactory.edit(file, $scope.id,$scope.fileType).then(function (response) {
                
                console.log(response);

            }, function (error) {
                $scope.message = "Error";
            });
            

            

        };

        

        
        
		
		
		
		

    }]);
	