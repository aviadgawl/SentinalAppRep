var sentinalApp = angular.module('sentinalApp',['ngRoute']).config(['$routeProvider',
  function($routeProvider) {
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
      otherwise({
        redirectTo: '/'
      });
  }]);