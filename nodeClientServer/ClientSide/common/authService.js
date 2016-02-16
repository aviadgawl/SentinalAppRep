sentinalApp.service('authService' , function($http){
    
    this.isAuth = function(keyParam){
        var token = localStorage.getItem(keyParam); 
        return token != null;
    }//end of isAuth.
    
    this.auth = function (keyParam , tokenParam) {
        localStorage.setItem(keyParam,tokenParam);
    }
});//end of authService.