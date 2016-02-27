var sentinalApp = angular.module('sentinalApp', ['ngRoute', 'angular-loading-bar']).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/registrate', {
                template: '<registration></registration>'
            }).
            when('/help', {
                templateUrl: '../dashboard/dashboardViews/helpView.html'
            }).
            when('/overreview', {
                templateUrl: '../dashboard/dashboardViews/overReviewView.html'
            }).
            when('/responceMatric', {
                template: '<responce-matric></responce-matric>'
            }).
            when('/topFaildApi', {
                template: '<top-failed-api></top-failed-api>'
            }).
            when('/profile', {
                template: '<profile></profile>'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]).controller('mainCtrl', function ($scope) {
        $scope.globalClientKey = "19238jd94h19239dn393i";
    }).run(function ($rootScope) {


    });