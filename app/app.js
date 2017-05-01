// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngCookies', 'ui.router', 'angularBootstrapNavTree', 'ngStorage', 'ngPassword']);

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
    $stateProvider.state({
        name: 'tempUsers',
        url: '/tempUsers',
        cache: false,
        templateUrl: 'pages/tempUsers.html',
        controller: 'tempUsersController'
    });
	$stateProvider.state({
        name: 'register',
        url: '/register',
        cache: false,
        templateUrl: 'pages/register.html',
        controller: 'registerController'
    });
    $stateProvider.state({
        name: 'forgetPassword',
        url: '/forgetPassword',
        cache: false,
        templateUrl: 'pages/forgetPassword.html',
        controller: 'forgetPasswordController'
    });
	$stateProvider.state({
        name: 'changePassword',
        url: '/changePassword',
        cache: false,
        templateUrl: 'pages/changePassword.html',
        controller: 'changePasswordController'
    });
	$stateProvider.state({
        name: 'upload',
        url: '/upload',
        cache: false,
        templateUrl: 'pages/upload.html',
        controller: 'uploadController'
    });
    $stateProvider.state({
        name: 'search',
        url: '/search',
        cache: false,
        templateUrl: 'pages/search.html',
        controller: 'searchController'
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

scotchApp.run(function ($rootScope, $http, $cookies, $httpBackend, $localStorage, $location) {
    
    
    // keep user logged in after page refresh
    if (localStorage['currentUsername']) {
        $rootScope.currentUserSignedIn = true;

        $http.defaults.headers.common.Authorization = 'JWT ' + window.localStorage['currentToken'];
        $rootScope.permission = window.localStorage['currentPermission'];
        $rootScope.files = JSON.parse(localStorage.getItem("files"));

        
    }
    
    console.log($rootScope.files);
    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        
        if (restrictedPage && !window.localStorage['currentUsername']) {
            console.log('test');


            $location.path('/login');
            window.location.reload();
            //window.location.reload();
            //$route.reload();
        }
    });



    console.log("App run");
    $rootScope.hasVisitedAboutPage = false;
    console.log($rootScope);
    
    //Logout function and remove user from local storage and clear http auth header
    $rootScope.doLogout = function () {
        console.log('Logout function');
        delete window.localStorage['currentUsername'];
        delete window.localStorage['currentUserID'];
        delete window.localStorage['currentToken'];
        delete window.localStorage['currentPermission'];
        delete window.localStorage['key'];
        delete window.localStorage['word'];
        delete window.localStorage['files'];
        $http.defaults.headers.common.Authorization = '';
        $rootScope.currentUserSignedIn = false;
    }

    console.log($rootScope);
});
