sentinalApp.service('registrationService' , function($http){
    
    this.registrate = function(userParam){
        
       var userAsJSON = JSON.stringify(userParam);
       return $http.post('http://localhost:4000/registrate' , {userInfo:userAsJSON}).then(function(res){
           return res.data;
           debugger
       });
    }//end of registrate.
});//end of registrationService.