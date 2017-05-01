// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngCookies', 'ui.router', 'angularjs-datetime-picker', 'smart-table','angularBootstrapNavTree']);

scotchApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'dashboard',
        url: '/',
        cache: false,
        templateUrl: 'pages/dashboard.html',
        controller: 'dashboardController'
    });
    $stateProvider.state({
        name: 'users',
        url: '/users',
        cache: false,
        templateUrl: 'pages/users.html',
        controller: 'usersController'
    });
    $stateProvider.state({
        name: 'about',
        url: '/about',
        cache: false,
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        cache: false,
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    });
    $stateProvider.state({
        name: 'register',
        url: '/register',
        cache: false,
        templateUrl: 'pages/register.html',
        controller: 'registerController'
    });
    $stateProvider.state({
        name: 'forgotPassword',
        url: '/forgotPassword',
        cache: false,
        templateUrl: 'pages/forgotPassword.html',
        controller: 'forgotPasswordController'
    });
    $stateProvider.state({
        name: 'userDetail',
        url: '/userDetail',
        cache: false,
        templateUrl: 'pages/userDetail.html',
        controller: 'userDetailController'
    });
    $stateProvider.state({
        name: 'shift',
        url: '/shift/:workerId',
        cache: false,
        templateUrl: 'pages/shift.html',
        controller: 'shiftController'
    });
    //shiftDetail page
    $stateProvider.state({
        name: 'shiftDetail',
        url: '/shiftDetail/:shiftId',
        cache: false,
        templateUrl: 'pages/shiftEdit.html',
        controller: 'shiftDetailController'
    });
    //shiftDetail page
    $stateProvider.state({
        name: 'shiftCreate',
        url: '/shiftCreate/:workerId',
        cache: false,
        templateUrl: 'pages/shiftCreate.html',
        controller: 'shiftCreateController'
    });
    // if none of the above states are matched, returned to login page
    $urlRouterProvider.otherwise('/');
});

scotchApp.run(function ($rootScope, $http, $cookies) {
    //refresh page
    $rootScope.currentUserSignedIn = false;
    $rootScope.isAdmin = false;
    $rootScope.isWorker = false;

    if ($cookies.get("AuthorizationHeader")) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get("AuthorizationHeader");
        $rootScope.currentUserSignedIn = true;
        var userType = $cookies.get("userType");
        if (userType == "Admin") {
            $rootScope.isAdmin = true;
            $rootScope.isWorker = true;
        }
        if (userType == "Worker") {
            $rootScope.isAdmin = false;
            $rootScope.isWorker = true;
        }
        if (userType == "Student"){
            $rootScope.isAdmin = false;
            $rootScope.isWorker = false;
        }
            console.log("currentUserSignedIn: " + $rootScope.currentUserSignedIn);
        console.log("userType: " + $rootScope.userType);
        console.log("Authorization: " + $http.defaults.headers.common['Authorization']);

    }

    //end

    console.log("App run");
    $rootScope.hasVisitedAboutPage = false;


    //add Logout function
    $rootScope.doLogout = function () {
        console.log('Logout function');
        $rootScope.currentUserSignedIn = false;
        //delete $rootScope.currentUser.name;
        //delete $http.defaults.headers.common['Authorization'];
        $cookies.remove("AuthorizationHeader");
        $cookies.remove("userType");
        $rootScope.isAdmin = false;
        $rootScope.isWorker = false;
    }
    //end


});
scotchApp.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])
