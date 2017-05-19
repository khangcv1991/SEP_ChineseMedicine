scotchApp.controller('logsController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory', 'orderByFilter',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory, orderBy) {
        console.log("logsController");
        $scope.users = [];
        $scope.pageSize = 20;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        if($rootScope.currentUserSignedIn == false || $rootScope.currentUserSignedIn== null){
            console.log("test");
            $location.path('/login');
        }
        console.log('test');
        
        dataFactory.getLogs().then(function (response) {
            
            
            
            console.log(response.data);
            $scope.logs = response.data;

        });

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

