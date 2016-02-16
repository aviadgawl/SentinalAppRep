sentinalApp.service('loginService', function ($http, $q, authService) {

    var ref = new Firebase("https://burning-heat-1811.firebaseio.com");

    this.verifyToken = function (userParam) {
        var isAuth = authService.isAuth(userParam);
        
        if(isAuth){//if authenticated
            return $q.resolve(true);
        }else{// if not authenticated
             return $http.post('http://localhost:4000/verify', { userInfo: userParam.userToken }).then(function (res) {
                return res.data;
            });//end of $http post request.
        }
    }
    
    this.login = function (userParam) {
        var isAuth = authService.isAuth(userParam);

        if (isAuth) {//if authenticated
            return $q.resolve(true);
        }
        else {//if not authenticated
            var userAsJSON = JSON.stringify(userParam);
            return $http.post('http://localhost:4000/login', { userInfo: userAsJSON }).then(function (res) {
                return res.data;
            });//end of $http post request.
        }
    }//end of loginAccount function.
    
    this.loginFacebook = function (callbackParam) {
        ref.authWithOAuthPopup('facebook',callbackParam);
    }//end of loginFacebook.
    
    this.loginTwitter = function (callbackParam) {
         ref.authWithOAuthPopup('twitter' , callbackParam);
    }//end of loginTwitter.
    
    this.loginGoogle = function (callbackParam) {
       ref.authWithOAuthPopup('google' , callbackParam);
    }//end of loginGoogle.
    
    this.loginGithub = function (callbackParam) {
        ref.authWithOAuthPopup('github' , callbackParam);
    }//end of loginGithub.
    
});//end of loginService.