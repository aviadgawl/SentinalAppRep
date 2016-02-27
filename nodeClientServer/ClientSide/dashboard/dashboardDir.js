sentinalApp.directive('dashboard', function ($window) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope, ele, attrs, ctrl) {
            var self = this;
           
        },//end of link.
        templateUrl: './dashboard/dashboardViews/dashboardView.html'
    };//end of return.
});