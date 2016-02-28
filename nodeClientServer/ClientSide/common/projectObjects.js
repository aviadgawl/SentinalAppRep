// auth objects.
function User() {
    this.userImageUrl = ''; 
    this.userThemeColor = '';
    this.userEmail = '';
    this.userPassword = '';
    this.userName = null;
    this.userToken = '';
    this.isLogged = false;
}

//Shalev Api objects.

function DurrationSegment() {
    this.totalAmount = 0;
    this.code200Amount = 0;
    this.code201Amount = 0;
    this.code400Amount = 0;
    this.code401Amount = 0;
    this.code404Amount = 0;
    this.code500Amount = 0;
}

//responceMatric status code. example : arrayParam[4] = {"amount": 0,"status": 0}
function StatusCodeMatricInfo(arrayParam) {
    var self = this;
    
    self.infoArray = arrayParam;
    self.colors = ['#70db70' , '#008000' , '#0066ff' , '#002966' , '#ff6666' , 'blue'];
    self.statusCodeMatric = [];
        
        for (var index = 0; index < self.infoArray.length; index++) {
            
            self.statusCodeMatric.push({label:self.infoArray[index].statusCode , 
            value:self.infoArray[index].amount , color:self.colors[index]});
        }
}

// function DetailSCMatricInfo(dur50Param , dur2000Param , dur5000Param , statusCode) {//[{amount:32323 , statusCode: 200}]
//     var self = this;
//     self.colors = ['#70db70' , '#008000' , '#0066ff' , '#002966' , '#ff6666' , 'blue'];
//     self.DeteiedSCMatric = []
//     
//     for (var cindex , index = 0; index < dur50Param.length; index++) {
//         if(statusCode == dur50Param[index].statusCode){
//             self.DeteiedSCMatric.push({label:'0 To 50' , value:dur50Param[index].amount , color:self.colors[cindex++]});
//         }
//         
//         if (statusCode == dur2000Param[index].statusCode) {
//             self.DeteiedSCMatric.push({label:'51 To 2000' , value:dur2000Param[index].amount , color:self.colors[cindex++]});
//         }
//         
//         if(statusCode == dur5000Param[index].statusCode){
//             self.DeteiedSCMatric.push({label:'2001 To 5000' , value:dur5000Param[index].amount , color:self.colors[cindex++]});
//         }
//     }
// }

function SubSCScheme(arrayParam) {//{amount: 233 , statusCode:200}
    var self = this;
    
    self.colors = ['#70db70' , '#008000' , '#0066ff' , '#002966' , '#ff6666' , 'blue'];
    self.arrayInfo = arrayParam;
    self.result = [];
    
    for (var index = 0; index < arrayParam.length; index++) {
          self.result.push({label:self.arrayInfo[index].durationFrom + "-" + self.arrayInfo[index].durationTo, 
          value:self.arrayInfo[index].amount , color: self.colors[index]});
    }
}

//responceMatric responce time. expample : arrayParam[0] = Object {amount: 757, durationFrom: 0, durationTo: 50, statusCode: 201}
function ResTimeMatricInfo(arrayParam) {

    var self = this;

    self.infoArray = arrayParam;
    var dur50 = new DurrationSegment();
    var dur2000 = new DurrationSegment();
    var dur5000 = new DurrationSegment();

    sumAllStatusCode(arrayParam, dur50, dur2000, dur5000);

    self.resTimeMatric = [
        { label: '0 - 50', value: dur50.totalAmount , color: "#878BB6"},
        { label: '51 - 2000', value: dur2000.totalAmount  , color:"#4ACAB4" },
        { label: '2001 - 5000', value: dur5000.totalAmount , color: "#FF8153" }
    ];
    
    self.statusCodeDur50 = [
        {label:'200' , value: dur50.code200Amount , color:'#70db70'},
        {label:'201' , value: dur50.code201Amount  , color:'#008000'},
        {label:'400' , value: dur50.code400Amount , color:'#0066ff'},
        {label:'401' , value: dur50.code401Amount , color:'#002966'},
        {label:'404' , value: dur50.code404Amount , color:'#00cccc'},
        {label:'500' , value: dur50.code500Amount , color:'#ff6666'}
    ];
    
    self.statusCodeDur2000 =[
        {label:'200' , value: dur2000.code200Amount , color:'#70db70'},
        {label:'201' , value: dur2000.code201Amount  , color:'#008000'},
        {label:'400' , value: dur2000.code400Amount , color:'#0066ff'},
        {label:'401' , value: dur2000.code401Amount , color:'#002966'},
        {label:'404' , value: dur2000.code404Amount , color:'#00cccc'},
        {label:'500' , value: dur2000.code500Amount , color:'#ff6666'}
    ];
    
    self.statusCodeDur5000 = [
        {label:'200' , value: dur5000.code200Amount , color:'#70db70'},
        {label:'201' , value: dur5000.code201Amount  , color:'#008000'},
        {label:'400' , value: dur5000.code400Amount , color:'#0066ff'},
        {label:'401' , value: dur5000.code401Amount , color:'#002966'},
        {label:'404' , value: dur5000.code404Amount , color:'#00cccc'},
        {label:'500' , value: dur5000.code500Amount , color:'#ff6666'}
    ];
}//end of resTimeMatricInfo.

//Responce time matric Agregations functions
function sumAllStatusCode(infoArrayParam, dur50, dur2000, dur5000) {

    for (var index = 0; index < infoArrayParam.length; index++) {
        var item = infoArrayParam[index];

        if (item.durationTo == 50) {
            dur50.totalAmount += item.amount;
            switch (item.statusCode) {
                case 200:
                    dur50.code200Amount += item.amount;
                    break;
                case 201:
                    dur50.code201Amount += item.amount;
                    break;
                case 400:
                    dur50.code400Amount += item.amount;
                    break;
                case 401:
                    dur50.code401Amount += item.amount;
                    break;
                case 404:
                    dur50.code404Amount += item.amount;
                    break;
                case 500:
                    dur50.code500Amount += item.amount;
                    break;
                default:
                    break;
            }
        }

        if (item.durationTo == 2000) {
            dur2000.totalAmount += item.amount;
              switch (item.statusCode) {
                case 200:
                    dur2000.code200Amount += item.amount;
                    break;
                case 201:
                    dur2000.code201Amount += item.amount;
                    break;
                case 400:
                    dur2000.code400Amount += item.amount;
                    break;
                case 401:
                    dur2000.code401Amount += item.amount;
                    break;
                case 404:
                    dur2000.code404Amount += item.amount;
                    break;
                case 500:
                    dur2000.code500Amount += item.amount;
                    break;
                default:
                    break;
            }
        }

        if (item.durationTo == 5000) {
            dur5000.totalAmount += item.amount;
              switch (item.statusCode) {
                case 200:
                    dur5000.code200Amount += item.amount;
                    break;
                case 201:
                    dur5000.code201Amount += item.amount;
                    break;
                case 400:
                    dur5000.code400Amount += item.amount;
                    break;
                case 401:
                    dur5000.code401Amount += item.amount;
                    break;
                case 404:
                    dur5000.code404Amount += item.amount;
                    break;
                case 500:
                    dur5000.code500Amount += item.amount;
                    break;
                default:
                    break;
            }
        }
    }//end of for.
}//end of aggragtions function.

//top failed apis quary!
function TFAQuary(servicesParam , durationParam , topParam) {//{ 'services': 'all', 'duration': int(minutes), 'top': (int?) }
    var self = this;
    
    self.services = servicesParam;
    
    self.duration = durationParam;
    
    self.top = topParam;
}