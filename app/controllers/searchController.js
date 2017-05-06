scotchApp.controller('searchController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
         console.log("searchController");

        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.key = "";
        $scope.word = "";
        $scope.files = [];
        $scope.files = JSON.parse(localStorage.getItem("files"));
        $scope.pageSize = 20;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        var key = ''
        //var orderBy = $filter('orderBy');
        
        
        $scope.search = function () {
            key = $scope.key;
            console.log($scope.key);
            console.log($scope.word);
            if ($scope.key == null || $scope.key == "")
            {
                console.log("test")
                key = 'All';
            }


            console.log(key);
            dataFactory.doSearch(key, $scope.word).then(function (response) {
                
                // $scope.message = response.data.Status;
                console.log(response);
                if(response.data.other_list)
                {
                    console.log('tst');
                    $scope.files = response.data.book_list.concat(response.data.other_list);
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    var storedFiles = JSON.parse(localStorage.getItem("files"));
                    console.log(storedFiles);
                }
                else if(response.data.book_list)
                {
                    $scope.files = response.data.book_list;
                    console.log(response.data.book_list)
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    var storedFiles = JSON.parse(localStorage.getItem("files"));
                    console.log(storedFiles);
                }

               

                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

        };

        // $scope.view = function (index) {
            
        //     console.log($scope.files[index][0]);
        //     dataFactory.view($scope.files[index][0]).then(function (response) {
        //         console.log(response);
        //         var pdfFileURL = baseUrl + response.data.path;
        //         // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
        //         // var fileURL = URL.createObjectURL(file);
        //         console.log(response.data.path);
                
        //         window.open(response.data.path);
                
        //         // $scope.message = response.data.Status;
                
                
                

                
        //         //$scope.files = response.data;

        //     }, function (error) {
        //         $scope.message = "Error";
        //     });
            

            

        // };

        // $scope.download = function (index) {
            
        //     console.log($scope.files[index][0]);
        //     dataFactory.download($scope.files[index][0]).then(function (response) {
        //         console.log(response);
        //         // var pdfFileURL = baseUrl + response.data.path;
        //         // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
        //         // var fileURL = URL.createObjectURL(file);
        //         // console.log(response.data.path);
                
        //         // window.open(response.data.path);
                
        //         // $scope.message = response.data.Status;
        //         $scope.fileUrl = response.data.path 
                
                

                
        //         //$scope.files = response.data;

        //     }, function (error) {
        //         $scope.message = "Error";
        //     });

        // };

        // $scope.removeFile = function (index) {
            
        //     console.log($scope.files[index][0]);
        //     dataFactory.removeFile($scope.files[index][0]).then(function (response) {
        //         console.log(response);
        //         // var pdfFileURL = baseUrl + response.data.path;
        //         // var file = new Blob([pdfFileURL], {type: 'application/pdf'});
        //         // var fileURL = URL.createObjectURL(file);
        //         // console.log(response.data.path);
                
        //         // window.open(response.data.path);
                
        //         // $scope.message = response.data.Status;
        //         window.location.reload();
                
                

                
        //         //$scope.files = response.data;

        //     }, function (error) {
        //         $scope.message = "Error";
        //     });

        // };

        $scope.sortData = function (orderItem) {
            
            console.log(orderItem);

            if ($scope.orderItem == orderItem)
            {
                orderItem = "-" + orderItem;
            }
            
            $scope.files =orderBy($scope.files, orderItem);
            $scope.orderItem = orderItem;

        };

        $scope.getDetails = function (index) {
            
            console.log('test');
            console.log($scope.files[index][0]);
            var type = ($scope.files[index][1]);
            console.log(type);
            dataFactory.getDetails($scope.files[index][0], type).then(function (response) {
                console.log(response.data);
                
                
                //window.location.reload();
                
                window.localStorage.setItem("fileDetail", angular.toJson(response.data));
                $location.path('/fileDetails');
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });

        };

    }]);