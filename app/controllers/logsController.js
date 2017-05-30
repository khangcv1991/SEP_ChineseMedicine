scotchApp.controller('logsController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
        console.log("logsController");
        $scope.users = [];
        $scope.pageSize = 20;
        $scope.currentPage = 1;
        $scope.maxSize = 15;

        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        console.log('test');
        
        dataFactory.getLogs().then(function (response) {
            
            
            
            console.log(response.data);
            $scope.logs = response.data;

        });

        $scope.recover = function (index) {
            
            console.log('test');
            console.log($scope.logs[index][0]);
            
            
            dataFactory.recovery($scope.logs[index][0]).then(function (response) {
                console.log(response.data);
                
                
                window.location.reload();
                
                
                
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
            
            $scope.logs =orderBy($scope.logs, orderItem);
            $scope.orderItem = orderItem;

        };

        
        

    }]);

