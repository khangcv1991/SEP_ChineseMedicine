scotchApp.controller('searchController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
         console.log("searchController");

        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.key = "All";
        $scope.word = "";
        $scope.files = [];
        $scope.files = JSON.parse(localStorage.getItem("currfiles"));
        $scope.pageSize = 20;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.keys = ['All', 'Title', 'Study Ref', 'Study ID', 'File Type', 'Category'];
        $scope.choices = JSON.parse(localStorage.getItem("currchoices"));
        
        if(window.localStorage.searchType)
        {
            console.log("test1");
            $scope.type = window.localStorage.searchType;
            $scope.keyword =  window.localStorage.searchKeyword;
        }
        else
        {
            console.log("test");
            $scope.type = null;
        }

        console.log($scope.choices);
        var key = ''
        console.log($rootScope.currentUserSignedIn)
        //var orderBy = $filter('orderBy');
        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        
        $scope.search = function () {
            key = $scope.key;
            $scope.choices = null;
            delete window.localStorage['currchoices'];
            if ($scope.key == null || $scope.key == "")
            {
                console.log("test")
                key = 'All';
            }

            $scope.type = key;
            $scope.keyword = $scope.word;

            window.localStorage.searchType = key;
            console.log(window.localStorage.searchType);
            window.localStorage.searchKeyword = $scope.keyword;

            
            
            var date = new Date();
            // currDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss'); 
            console.log(date);
            dataFactory.doSearch(key, $scope.word).then(function (response) {
                
                // $scope.message = response.data.Status;
                console.log(response);
                if(response.data.other_list != null)
                {
                    
                    $scope.files = response.data.book_list.concat(response.data.other_list);
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    
                    
                }
                else if(response.data.book_list != null)
                {
                    
                    $scope.files = response.data.book_list;
                    console.log(response.data.book_list)
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    
                }
                else
                {
                    console.log('test');
                    $scope.files = response.data;
                    
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                }

               
                
                //$scope.files = response.data;

            }, function (error) {
                $scope.message = "Error";
            });
            

        };

        

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

        $scope.pdfFilter = function () {
            
            pdfFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][1].toUpperCase() == 'PDF')
                {
                    pdfFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = pdfFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };
        $scope.excelFilter = function () {
            
            excelFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][1].toUpperCase() == 'XLSX')
                {

                    excelFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = excelFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.hzFilter = function () {
            
            hzFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][3].toUpperCase() == 'HZ')
                {

                    hzFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = hzFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.phnFilter = function () {
            
            phnFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][3].toUpperCase() == 'PHN')
                {

                    phnFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = phnFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.allFilter = function () {
            
            

            $scope.files = JSON.parse(localStorage.getItem("files"));
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.docFilter = function () {
            
            docFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][1].toUpperCase() == 'DOCX')
                {

                    docFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = docFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

    }]);