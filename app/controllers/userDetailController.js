scotchApp.controller('userDetailController', ['$scope', '$location', '$rootScope', '$http', '$cookies', 'dataFactory',
    function ($scope, $location, $rootScope, $http, $cookies, dataFactory) {
        console.log("userController");
        var userId = $stateParams.userId;

        $scope.newPass = ""
        $scope.updateUser = function () {
            console.log("updateuser");
            dataFactory.updatePassword(userId, newPass).then(function (respone) {
                console.log(respone);
            })

        }
        
		
        $scope.removeUser = function () {

            console.log("removeUser");
            var adminKey = $cookies.get("adminKey");
            dataFactory.deleteUser(userId, adminKey).then(function (respone) {
                console.log(respone);
            })
        }
		
		
		
		

    }]);
	
scotchApp.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
