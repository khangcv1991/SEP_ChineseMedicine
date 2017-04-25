scotchApp.controller('homeController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {

        (function () {
            console.log("home page ");
            //check login
            if( $rootScope.currentUserSignedIn == false){
                $location.path('/login');
            }

            //end
            var treedata_geography = [{
                label: 'Clinical guielines',
                children: [{
                    label: 'File1',
                    data: {
                        title: "File1",
                        description: "Herb",
                        data1: "sadasdaa",
                        type: "pdf",
                        author: "Cheng",
                        size: ""
                    },
                }, ]
            }, {
                label: 'EndNote Libraries',
                children: [{
                    label: 'Test File2', 
                    data: {
                        title: "Test File2",
                        description: "studies",
                        data1: "sadasdaa",
                        type: "Excel",
                        author: "KD",
                        size: ""
                    },             
                }, ]
            },{
                label: 'Experimental Studies',
                children: [{
                    label: 'Test File3', 
                    data: {
                        title: "Test File3",
                        description: "Herb",
                        data1: "sadasdaa",
                        type: "Word",
                        author: "Deng",
                        size: ""
                    },             
                }, ]
            },
            {
                label: 'Modern Clinical',
                children: [{
                    label: 'Excel files',
                    children: ['Caracas', 'Maracaibo']
                }, {
                    label: 'PDFs',
                    children: ['Sao Paulo', 'Rio de Janeiro']
                }, {
                    label: 'RevMan  fiels',
                    children: ['Buenos Aires', 'Cordoba']
                
                }]
            }
            ];
            $scope.my_data = treedata_geography;


        })();
        $scope.my_tree_handler = function(branch) {
            var _ref;
            
            $scope.output = "Selected: ";
            if ((_ref = branch.data) != null ? _ref.description : void 0) {

                $scope.output += "Title: " + _ref.title + " ";
                $scope.output += "Author: " + _ref.author + " ";
                $scope.output += "description: " + _ref.description + " ";
            }
            if ((_ref = branch.data) != null ? _ref.data1 : void 0) {
                 
            }
            return $scope.output;
    };

        // create a message to display in our view
        console.log($rootScope);


    }]);
