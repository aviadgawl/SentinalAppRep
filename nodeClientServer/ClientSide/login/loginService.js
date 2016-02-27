sentinalApp.service('loginService', function ($http, $q) {

    var ref = new Firebase("https://burning-heat-1811.firebaseio.com");

    this.verifyToken = function (userParam) {
        var deferred = $q.defer();
        
        return $http.post('http://localhost:4000/verify', { userInfo: userParam.userToken }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;/*.then(function (res) {
            return res.data;
        });//end of $http post request.*/
        
    }//end of verify token.

    this.resetPassword = function (userParam) {
        var deferred = $q.defer();
        
        return $http.post('http://localhost:4000/resetPassword', { userInfo: userParam.userEmail }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;/*.then(function (res) {
            return res.data;
        });//end of $http post request.*/
        
    }//end of verify token.

    this.login = function (userParam) {
        var deferred = $q.defer();

        var userAsJSON = JSON.stringify(userParam);
        return $http.post('http://localhost:4000/login', { userInfo: userAsJSON }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;/*.then(function (res) {
            return res.data;
        });//end of $http post request.*/
        
    }//end of loginAccount function.
    
    this.loginFacebook = function (callbackParam) {
        ref.authWithOAuthPopup('facebook', callbackParam);
    }//end of loginFacebook.
    
    this.loginTwitter = function (callbackParam) {
        ref.authWithOAuthPopup('twitter', callbackParam);
    }//end of loginTwitter.
    
    this.loginGoogle = function (callbackParam) {
        ref.authWithOAuthPopup('google', callbackParam);
    }//end of loginGoogle.
    
    this.loginGithub = function (callbackParam) {
        ref.authWithOAuthPopup('github', callbackParam);
    }//end of loginGithub.
    
});//end of loginService.