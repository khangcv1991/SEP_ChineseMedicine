scotchApp.controller('editController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
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
	