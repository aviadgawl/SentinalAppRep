sentinalApp.service('localStorageService' , function($http){
    
    var self = this;
    
    self.isAuth = function(keyParam){
        var token = localStorage.getItem(keyParam); 
        return token != null;
    }//end of isAuth.
    
    self.add = function (keyParam , tokenParam) {
        localStorage.setItem(keyParam,tokenParam);
    }
    
    self.remove = function(keyParam){
        localStorage.removeItem(keyParam);
    }
    
    self.get = function(keyParam){
        return localStorage.getItem(keyParam);
    }
});//end of authService.