sentinalApp.directive('dashboard', function ($window , localStorageService) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope, ele, attrs, ctrl) {
            var self = scope;
            self.userOnline = JSON.parse(localStorageService.get(self.globalUserKey));
        },//end of link.
        templateUrl: './dashboard/dashboardViews/dashboardView.html'
    };//end of return.
});