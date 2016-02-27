sentinalApp.directive('responceMatric', function (responceMatricService, localStorageService, $rootScope) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope) {
            var self = scope;
            self.resTimeMatricInfo;
            self.statusCodeMatricInfo;

            self.mainResTimeCanvas = document.getElementById('mainResTimeCanvas');
            self.mainResTimeContext = self.mainResTimeCanvas.getContext('2d');
            self.subResTimeCanvas = document.getElementById('subResTimeCanvas');
            self.subResTimeContext = self.subResTimeCanvas.getContext('2d');
            self.subResTimeHeader = document.getElementById('subResTimeHeader');

            self.mainSCCanvas = document.getElementById('mainSCCanvas');
            self.mainSCContext = self.mainSCCanvas.getContext('2d');

            self.submainSCCanvas = document.getElementById('subSCCanvas');
            self.subSCContext = self.submainSCCanvas.getContext('2d');
            self.subSCHeader = document.getElementById('subSCHeader');

            var mainChartOp = {
                segmentShowStroke: false,
                animateScale: true
            }

            var subChartOp = {
                segmentShowStroke: false,
                animateScale: true
                //tooltipTemplate: "<%= value %>%"
            }

            responceMatricService.getResponceMatricStatusCode(localStorageService.get(self.globalClientKey), '').then(function (data) {

                self.statusCodeMatricInfo = new StatusCodeMatricInfo(data.data);
                self.mainSCChart = new Chart(self.mainSCContext).Pie(self.statusCodeMatricInfo.statusCodeMatric, mainChartOp);
                document.getElementById("mainSCChartLegend").innerHTML = self.mainSCChart.generateLegend();


            }, function (error) {
                alert('server error: ' + error.data + " | " + error.status);
            });//end of responce matric status code.
            
            responceMatricService.getResponceTimeMatric(localStorageService.get(self.globalClientKey), '').then(function (data) {

                self.resTimeMatricInfo = new ResTimeMatricInfo(data.data);
                self.mainChart = new Chart(self.mainResTimeContext).Pie(self.resTimeMatricInfo.resTimeMatric, mainChartOp);
                document.getElementById("mainResTimeChartLegend").innerHTML = self.mainChart.generateLegend();

            }, function (error) {
                alert('server error: ' + error.data + " | " + error.status);
            });//end of responce matric responce time.
            
            self.mainResTimeCanvas.onclick = function (evt) {
                var subResTimeChartLegend = document.getElementById('subResTimeChartLegend');
                var activePoints = self.mainChart.getSegmentsAtEvent(evt);// acitvePoints = [charElement];
                var chartElementClicked = activePoints[0];//activePoints[0] = ChartElement {value: 40, outerRadius: 99.5, innerRadius: 0, fillColor: "#4ACAB4", highlightColor: "#4ACAB4"…}
                    
                if (chartElementClicked.value == self.resTimeMatricInfo.resTimeMatric[0].value) {// if the amount of durationTo 50 was clicked.
                    var subChart = new Chart(self.subResTimeContext).Pie(self.resTimeMatricInfo.statusCodeDur50, subChartOp);
                    subResTimeChartLegend.innerHTML = subChart.generateLegend();
                    self.subResTimeHeader.innerHTML = "<h3 class='fadeIn'> 0 - 50 Status Code</h3>";
                }

                if (chartElementClicked.value == self.resTimeMatricInfo.resTimeMatric[1].value) {// if the amount of durationTo 2000 was clicked.
                    var subChart = new Chart(self.subResTimeContext).Pie(self.resTimeMatricInfo.statusCodeDur2000, subChartOp);
                    subResTimeChartLegend.innerHTML = subChart.generateLegend();
                    self.subResTimeHeader.innerHTML = "<h3 class='fadeIn'> 51 - 2000 Status Code</h3>";
                }

                if (chartElementClicked.value == self.resTimeMatricInfo.resTimeMatric[2].value) {// if the amount of durationTo5000 was clicked.
                    var subChart = new Chart(self.subResTimeContext).Pie(self.resTimeMatricInfo.statusCodeDur5000, subChartOp);
                    subResTimeChartLegend.innerHTML = subChart.generateLegend();
                    self.subResTimeHeader.innerHTML = "<h3 class='fadeIn'> 2001 - 5000 Status Code</h3>";
                }

            };//end of responce time matric onclick event.
                
            self.mainSCCanvas.onclick = function (evt) {

                var subSCChartLegend = document.getElementById('subSCChartLegend');
                var activePoints = self.mainSCChart.getSegmentsAtEvent(evt);// acitvePoints = [charElement];
                var chartElementClicked = activePoints[0];//activePoints[0] = ChartElement {value: 40, outerRadius: 99.5, innerRadius: 0, fillColor: "#4ACAB4", highlightColor: "#4ACAB4"…}
                var statusArray = [200 , 201 , 400, 401 , 404 ,500];
                
                for (var index = 0; index < statusArray.length; index++) {
                    if (chartElementClicked.label == statusArray[index]) {
                        responceMatricService.getResponceTimeMatric(localStorageService.get(self.globalClientKey), "?statusCode=" + statusArray[index])
                            .then(function (data) {
                                var subSCscheme = new SubSCScheme(data.data);

                                var subChart = new Chart(self.subSCContext).Pie(subSCscheme.result, subChartOp);
                                subSCChartLegend.innerHTML = subChart.generateLegend();
                                self.subSCHeader.innerHTML = "<h3 class='fadeIn'> Code:" + statusArray[index] +"</h3>";
                                
                            } , function(error){
                                alert('server error: ' + error.data + " | " + error.status);
                            });
                            
                            break;
                    }

                }
            };//end of status code matric onclick event.
        },//end of link.
        templateUrl: './dashboard/responceMatric/responceMatricTemp.html'
    }
});//end of responceMatric directive.