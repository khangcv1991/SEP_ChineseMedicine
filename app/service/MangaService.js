/**
 * Created by admin on 17/2/17.
 */
'use strict';
angular.module('MangaService', []).factory('MangaService', MangaService);
MangaService.$inject = ['$http'];
function MangaService($http) {
    var MangaService = {};
    MangaService.async1 = async1Impl;

    function async1Impl(link) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get(link).then(function (response) {
            // The then function here is an opportunity to modify the response
            console.log('async1:' + response);
            // The return value gets picked up by the then in the controller.
            return response.data;
        });
        // Return the promise to the controller
        return promise;
    }

    return MangaService;
};



