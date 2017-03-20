'use strict';

angular.module('myApp.view2', ['ngRoute', 'MangaService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl',
            controllerAs: 'vm'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$cookieStore', 'MangaService', function ($scope, $cookieStore, MangaService) {



    }]);