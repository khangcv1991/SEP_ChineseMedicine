scotchApp.controller('searchController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
         console.log("searchController");

        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.key = "";
        $scope.word = "";
        $scope.files = $rootScope.files;
        baseUrl = 'localhost';
        
        $scope.search = function () {
            
            console.log($scope.key);
            console.log($scope.word);

            
            dataFactory.doSearch($scope.key, $scope.word).then(function (response) {
                
                // $scope.message = response.data.Status;

                $scope.files = response.data.book_list.concat(response.data.other_list);
                window.localStorage.setItem("files", JSON.stringify($scope.files));
                var storedFiles = JSON.parse(localStorage.getItem("files"));
                console.log(storedFiles);

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

        };

        $scope.view = function (index) {
            
            console.log($scope.files[index][0]);
            dataFactory.view($scope.files[index][0]).then(function (response) {
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

        $scope.removeFile = function (index) {
            
            console.log($scope.files[index][0]);
            dataFactory.removeFile($scope.files[index][0]).then(function (response) {
                console.log(response);
                // var pdfFileURL = baseUrl + response.data.path;
                // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
                // var fileURL = URL.createObjectURL(file);
                // console.log(response.data.path);
                
                // window.open(response.data.path);
                
                // $scope.message = response.data.Status;
                window.location.reload();
                
                

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });

        };

    }]);