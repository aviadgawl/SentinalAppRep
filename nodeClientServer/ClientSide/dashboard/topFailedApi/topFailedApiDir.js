sentinalApp.directive('topFailedApi', function (topFailedApiService, localStorageService) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope) {
            var self = scope;
            self.data = '';
            self.serviceToDisp = [];
            self.serverNames = [];
            self.apisNames = [];
            self.quary = null;
            self.mainChartHeader = document.getElementById('mainFailedChartHeader');
            self.mainChartCanvas = document.getElementById('mainFailedChartCanvas');
            self.mainCanvasContext = self.mainChartCanvas.getContext('2d');

            self.createApisSelect = function (serverName) {

                if (self.serverNames.length == 0 || !arrayIsExsit(serverName, self.serverNames)) {
                    self.serverNames.push(serverName);
                    
                }
                else {
                    
                    arrayRemoveValue(serverName , self.serverNames);
                    
                }
                
                self.serviceToDisp = [];
                for (var i = 0; i < self.data.length; i++) {

                    for (var j = 0; j < self.serverNames.length; j++) {

                        if (self.serverNames[j] == self.data[i].serverName) {
                            self.serviceToDisp.push({serverName: self.serverNames[j] , apis:[]})
                            for (var g = 0; g < self.data[i].apis.length; g++) {
                                
                                self.serviceToDisp[j].apis.push(self.data[i].apis[g]);
                            }
                        }
                    }
                  
                }
            }

            topFailedApiService.getAllTopFaliedApi(localStorageService.get(self.globalClientKey)).then(function (res) {
                self.data = res.data;
            }, function (error) {
                alert('server error: ' + error.data + " | " + error.status);
            });
            
            self.getChartData = function(){
                 topFailedApiService.getTopFaliedApi(localStorageService.get(self.globalClientKey) , self.quary).then(function(res){
                     
                 } , function(error){
                     alert('server error:' + error.data + " | " + error.status);
                 });
            }
            //============================================================================================================================            
            var data = {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        fillColor: "#48A497",
                        strokeColor: "#48A4D1",
                        data: [456, 479, 324, 569, 702, 600]
                    },
                    {
                        fillColor: "rgba(73,188,170,0.4)",
                        strokeColor: "rgba(72,174,209,0.4)",
                        data: [364, 504, 605, 400, 345, 320]
                    }

                ]
            }

            var options = {
                segmentShowStroke: false,
                animateScale: true
                //responsive: true,
                //maintainAspectRatio: false
                //tooltipTemplate: "<%= value %>%"
            }

            var myBarChart = new Chart(self.mainCanvasContext).Bar(data, options);
        },
        templateUrl: './dashboard/topFailedApi/topFailedApiTemp.html'
    };
});

// function createHtmlServerNames(arrayParam) {
// 
//     var html = "<ng-model='quary.serverName' ng-click='createHtmlApis()' select>";
// 
//     for (var index = 0; index < arrayParam.length; index++) {
//         html += "<option value=" + arrayParam[index].serverName + ">" + arrayParam[index].serverName + "</option>";
//     }
// 
//     return html += "<option value='all'>All</option></select>";
// }
// 
// function createHtmlApis() {
//     var html = '<select>';
// 
//     for (var index = 0; index < self.data.length; index++) {
// 
//         if (self.data[index].serverName == self.quary.serverName) {
// 
//             for (var jindex = 0; jindex < self.data[index].apis.length; jindex++) {
//                 html += '<option value=' + self.data[index].apis[jindex] + '>' + self.data[index].api[jindex] + '</option>';
// 
//             }
//         }
//     }
// 
//     return html += '<option value=all>All</option></select>';
// }
//check if a value is in the array.
function arrayIsExsit(valueParam , arrayParam) {
    var flag = false;
    
    for (var index = 0; index < arrayParam.length; index++) {
        if (arrayParam[index] == valueParam) {
            flag = true;
        }
    }
    
    return flag;
}

function arrayRemoveValue(valueParam , arrayParam) {
    for (var index = 0; index < arrayParam.length; index++) {
        if(arrayParam[index] == valueParam){
             arrayParam.splice(index, 1);
        }
        
    }
}