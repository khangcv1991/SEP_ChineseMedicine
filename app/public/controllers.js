/**
 * Created by leonnguyen on 18/02/2017.
 */
// create the controller and inject Angular's $scope


scotchApp.controller('aboutController', function ($scope, $rootScope) {
    console.log("About");
    $scope.message = 'This is the admin site for Chinese medicine file management';
    $rootScope.hasVisitedAboutPage = true;
});

scotchApp.controller('contactController', function ($scope, $location, $rootScope) {
    console.log("Contact");

    if ($rootScope.hasVisitedAboutPage == true) {
        $scope.message = 'If there is any issues please contact info@coeusgroup.com.au';
    }
    else {
        $location.path('/about');
    }
});