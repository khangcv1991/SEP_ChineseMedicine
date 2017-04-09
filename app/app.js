// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngCookies', 'ui.router', 'angularBootstrapNavTree']);

scotchApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        cache: false,
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    });
    $stateProvider.state({
        name: 'about',
        url: '/about',
        cache: false,
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    });
    $stateProvider.state({
        name: 'contact',
        url: '/contact',
        cache: false,
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
    $stateProvider.state({
        name: 'login',
        url: '/login',
        cache: false,
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    });
    $stateProvider.state({
        name: 'users',
        url: '/users',
        cache: false,
        templateUrl: 'pages/users.html',
        controller: 'userController'
    });
    //shiftDetail page
    $stateProvider.state({
        name: 'userDetail',
        url: '/userDetail/:userId',
        cache: false,
        templateUrl: 'pages/userDetail.html',
        controller: 'userDetailController'
    });
    $stateProvider.state({
        name: 'userAdd',
        url: '/userAdd',
        cache: false,
        templateUrl: 'pages/userAdd.html',
        controller: 'userAddController'
    });
    // if none of the above states are matched, returned to login page
    $urlRouterProvider.otherwise('/');
});

scotchApp.run(function ($rootScope, $http, $cookies, $httpBackend) {
    //20170314 khangcv refresh page
    $rootScope.currentUserSignedIn = false;

    if ($cookies.get("AuthorizationHeader")) {


        $rootScope.currentUserSignedIn = true;
        console.log("currentUserSignedIn: " + $rootScope.currentUserSignedIn);
    }

    //end

    console.log("App run");
    $rootScope.hasVisitedAboutPage = false;

    // $httpBackend
    //     .when('GET', 'pages/login.html')
    //     .respond({
    //
    //     })
    // ;
    // $httpBackend
    //     .when('GET', 'pages/home.html')
    //     .respond({
    //         name: 'home',
    //         url: '/',
    //         cache: false,
    //         templateUrl: 'pages/home.html',
    //         controller: 'homeController'
    //     })
    // ;
    // $httpBackend
    //     .when('POST', 'api/login', {
    //         username: 'admin',
    //         password: '123'
    //     })
    //     .respond({
    //         staus: 200,
    //         permission: '1'
    //     })
    // ;
    // $httpBackend
    //     .when('POST', 'api/login', {
    //         username: 'user1',
    //         password: '123'
    //     })
    //     .respond({
    //         staus: 200,
    //         permission: '2'
    //     })
    // ;

    //20170314 khangcv add Logout function
    $rootScope.doLogout = function () {
        console.log('Logout function');
        $rootScope.currentUserSignedIn = false;
        //delete $rootScope.currentUser.name;
        //delete $http.defaults.headers.common['Authorization'];
        $cookies.remove("AuthorizationHeader");

    }
    //end


    console.log($rootScope);
});
