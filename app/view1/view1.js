'use strict';

angular.module('myApp.view1', ['ngRoute', 'MangaService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            controllerAs: 'vm'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$cookieStore', 'MangaService', function ($scope, $http, $cookieStore, MangaService) {


    }]);