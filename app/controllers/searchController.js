scotchApp.controller('searchController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
         console.log("searchController");


        $scope.message = 'Please populate user name, password and permission!!!';
        $scope.key =  'All';
        $scope.word = '';
        $scope.files = [];
        $scope.files = JSON.parse(localStorage.getItem("currfiles"));
        $scope.pageSize = 20;
        $scope.currentPage = 1;
        $scope.maxSize = 15;
        $scope.keys = ['All', 'Title', 'Study Ref', 'Study ID', 'File Type', 'Category'];
        $scope.choices = JSON.parse(localStorage.getItem("currchoices"));
        $scope.fType = true;
        $scope.studyDes = true;
        $scope.inte = true;
        $scope.mono = true;
        $scope.cate = true;
        

        
        if(window.localStorage.searchType)
        {
            
            $scope.type = window.localStorage.searchType;
            $scope.keyword = window.localStorage.searchKeyword;
            $scope.key = $scope.type;
            $scope.word = $scope.keyword;
        }
        else
        {
            console.log("test2");
            $scope.type = null;
        }

        console.log($scope.choices);
        var key = ''
        console.log($rootScope.currentUserSignedIn)
        //var orderBy = $filter('orderBy');
        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
            window.location.reload();
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
                    
                    for (var i = 0; i < $scope.files.length; i++)
                    {
                        if (!$scope.files[i][6])
                        {
                            
                            $scope.files[i][6] = "NA ";


                        }
                    }
                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                    
                    
                }
                else if(response.data.book_list != null)
                {
                    
                    $scope.files = response.data.book_list;
                    
                    
                    for (var i = 0; i < $scope.files.length; i++)
                    {
                        if (!$scope.files[i][6])
                        {                            
                            $scope.files[i][6] = "NA "
                        }
                    }

                    window.localStorage.setItem("files", JSON.stringify($scope.files));
                    window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
                }
                else
                {
                    console.log('test');
                    $scope.files = response.data;
                    for (var i = 0; i < $scope.files.length; i++)
                    {
                        if (!$scope.files[i][6])
                        {
                            $scope.files[i][6] = "NA ";

                        }
                    }
                    
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
            
            
            $scope.cate = true;
            $scope.inte = true;
            $scope.studyDes = true;
            $scope.mono = true;
            $scope.fType = true;
            $scope.files = JSON.parse(localStorage.getItem("files"));
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.docFilter = function () {
            
            docFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][1].toUpperCase() == 'DOCX' || totalfiles[index][1].toUpperCase() == 'DOC')
                {

                    docFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = docFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };


        $scope.txtFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][1].toUpperCase() == 'TXT')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.publFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Publications')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.modeFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Modern Clinical studies')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.endnFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'EndNote libraries')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.expeFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Experimental studies')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.classFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Classical literature')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.epidFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Epidata')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.monoFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][4] == 'Monograph')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.acuFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][7] == 'ACU')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.chmFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][7] == 'CHM')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.combFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][7] == 'COMB')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.othFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][7] == 'OTH')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.cctFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][8] == 'CCT')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.ncsFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][8] == 'NCS')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.rctFilter = function () {
            
            txtFiles = [];
            totalfiles = JSON.parse(localStorage.getItem("files"));
            for (index = 0; index < totalfiles.length; ++index) {
                
                if (totalfiles[index][8] == 'RCT')
                {

                    txtFiles.push(totalfiles[index]);
                }
                
            }

            $scope.files = txtFiles;
            
            window.localStorage.setItem("currfiles", JSON.stringify($scope.files));
            

        };

        $scope.fileType = function() {
            $scope.fType = $scope.fType === false ? true: false;
            $scope.cate = true;
            $scope.inte = true;
            $scope.studyDes = true;
            $scope.mono = true;
        };

        $scope.monograph = function() {
            $scope.mono = $scope.mono === false ? true: false;
            $scope.cate = true;
            $scope.inte = true;
            $scope.studyDes = true;
            $scope.fType = true;
        };

        $scope.category = function() {
            $scope.cate = $scope.cate === false ? true: false;
            $scope.mono = true;
            $scope.inte = true;
            $scope.studyDes = true;
            $scope.fType = true;
        };

        $scope.intervention = function() {
            $scope.inte = $scope.inte === false ? true: false;
            $scope.cate = true;
            $scope.mono = true;
            $scope.studyDes = true;
            $scope.fType = true;
        };

        $scope.studyDesign = function() {
            $scope.studyDes = $scope.studyDes === false ? true: false;
            $scope.cate = true;
            $scope.inte = true;
            $scope.mono = true;
            $scope.fType = true;
        };



    }]);