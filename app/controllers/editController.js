scotchApp.controller('editController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, $stateParams) {
        

        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        
        var deta = localStorage.getItem("fileDetail")
        var detail = JSON.parse(deta)
        console.log(detail.id)

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
            
            
            userID = window.localStorage['currentUserID'];
            dataFactory.edit(file, $scope.id,$scope.fileType, userID).then(function (response) {
                
                console.log(response);
                window.localStorage.setItem("currfiles", null);
                $location.path('/');
                

            }, function (error) {
                $scope.message = "Error";
            });
            

            

        };

        

        
        
		
		
		
		

    }]);
	