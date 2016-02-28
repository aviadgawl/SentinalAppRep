sentinalApp.directive('snapshot', function (snapshotService, localStorageService) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        templateUrl: './dashboard/snapshot/snapshotTemp.html',
        link: function (scope, element) {
            var self = scope;
            self.showResponceMatric = true;
            self.showTopFailedApi = true;
            self.showVirtualMachines = true;
            self.emailToSend = '';
            
            self.takeSnapshot = function () {
                
                html2canvas(document.body, {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL('image/png', 1)
                        debugger
                        snapshotService.snapshot(localStorageService.get(self.globalClientKey), self.emailToSend, data )
                            .then(function (res) {
                                alert(res.data);
                            }, function (error) {
                                alert(error.data + 'error sending mail');
                        });
                    }});
            }
        }
    }
});