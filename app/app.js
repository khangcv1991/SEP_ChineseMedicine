'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'MangaService',
    'AuthenticationService',
    'UserService',
    'ngMockE2E',
    'myApp.view1',
    'myApp.view2',

    'ngCookies',
    'myApp.version'
]).config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}

run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$localStorage', '$httpBackend'];
function run($rootScope, $location, $cookies, $http, $localStorage, $httpBackend) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }


    var testUser = {username: 'test', password: 'test', firstName: 'Test', lastName: 'User'};

    // fake authenticate api end point
    $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
        // get parameters from post request
        var params = angular.fromJson(data);

        // check user credentials and return fake jwt token if valid
        if (params.username === testUser.username && params.password === testUser.password) {
            return [200, {token: 'fake-jwt-token'}, {}];
        } else {
            return [404, {}, {}];
        }
    });

    // pass through any urls not handled above so static files are served correctly
    $httpBackend.whenGET(/^\w+.*/).passThrough();

}