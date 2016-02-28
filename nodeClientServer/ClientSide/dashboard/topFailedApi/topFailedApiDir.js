sentinalApp.directive('topFailedApi', function (topFailedApiService, localStorageService) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope , element) {
            var self = scope;
            self.test = {
                item:[]
            };
            self.data = '';
            self.serviceToDisp = [];
            self.serverNames = [];
            self.apisNames = [];
            self.quary = '';
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
            
            self.onClick = function(){
                for (var i = 0; i < self.test.services.length; i++) {
                    makeTheSame(self.test.services[i].apis , self.test.apis); 
                }
                debugger
                //{ 'services': [{ 'serverName': string, 'apis': [ string ] }], 'duration': int(minutes), 'top': (int?) }
                 topFailedApiService.getTopFaliedApi(localStorageService.get(self.globalClientKey) ,
                  JSON.stringify(new TFAQuary(self.test.services ,self.quary.duration , self.quary.top))).then(function(res){
                     
                 } , function(error){
                     alert('server error:' + error.data + " | " + error.status);
                 });
                debugger
            }
            
            topFailedApiService.getAllTopFaliedApi(localStorageService.get(self.globalClientKey)).then(function (res) {
                self.data = res.data;
            }, function (error) {
                alert('server error: ' + error.data + " | " + error.status);
            });
            
            self.getChartData = function(){
                
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

function makeTheSame(arrayTarget , arrayExample){
    for (var i = 0; i < arrayExample.length; i++) {
        for (var j = 0; j < arrayTarget.length; j++) {
            if(arrayExample[i] != arrayTarget[j]){
                arrayRemoveValue(arrayTarget[j] , arrayTarget);
            }
        }
        
    }
}