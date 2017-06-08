scotchApp.controller('fileDetailsController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
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
        
        console.log('test')
        console.log($stateParams);
        var deta = localStorage.getItem("fileDetail")
        var detail = JSON.parse(deta)
        

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
        console.log($scope.path);


        $scope.view = function (id) {

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
            
            console.log(id);
            dataFactory.view(id, $scope.fileType).then(function (response) {
                console.log(response);
                var pdfFileURL = baseUrl + response.data.path;
                // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
                // var fileURL = URL.createObjectURL(file);
                console.log(pdfFileURL);
                
                window.open(response.data.path);
                
                // $scope.message = response.data.Status;
                
                
                

                
                //$scope.files = response.data;

            }, function (error) {
                console.log(statusText);
            });
            

            

        };

        $scope.edit = function (id) {
            
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

            console.log(id);
            dataFactory.edit(id).then(function (response) {
                console.log(response);
                var pdfFileURL = baseUrl + response.data.path;
                // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
                // var fileURL = URL.createObjectURL(file);
                console.log(response.data.path);
                
                window.open(response.data.path);
                
                // $scope.message = response.data.Status;
                
                
                

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

            

        };

        $scope.download = function (index) {
            
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
            console.log($scope.files[index][0]);
            dataFactory.download($scope.files[index][0]).then(function (response) {
                console.log(response);
                // var pdfFileURL = baseUrl + response.data.path;
                // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
                // var fileURL = URL.createObjectURL(file);
                // console.log(response.data.path);
                
                // window.open(response.data.path);
                
                // $scope.message = response.data.Status;
                $scope.fileUrl = response.data.path 
                
                

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });

        };

        $scope.removeFile = function (id) {
            
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
            
            console.log(id);
            userID = window.localStorage['currentUserID'];
            dataFactory.removeFile(id, $scope.fileType, userID).then(function (response) {
                console.log(response);
                // var pdfFileURL = baseUrl + response.data.path;
                // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
                // var fileURL = URL.createObjectURL(file);
                // console.log(response.data.path);
                
                // window.open(response.data.path);
                
                // $scope.message = response.data.Status;
                window.localStorage.setItem("currfiles", null);
                $location.path('/');
                
                

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });

        };

        // $scope.getDetails = function (index) {
            
        //     console.log('test');
        //     console.log($scope.files[index][0]);
        //     var type = 'pdf';
        //     console.log(type);
        //     dataFactory.getDetails($scope.files[index][0], type).then(function (response) {
        //         console.log(response.data);
                
                
        //         //window.location.reload();
                
        //         window.localStorage.setItem("fileDetail", angular.toJson(response.data));
        //         $location.path('/fileDetails');
        //         //$scope.files = response.data;

        //     }, function (error) {
        //         $scope.message = "Error";
        //     });

        // };

        // $http({
        //     url: 
        //     method: "get",
        //     params: {fileID : $stateParams.fileID}
        // }).then(function(response)){
        //     details = response.data;
        // }

        
        
		
		
		
		

    }]);
	