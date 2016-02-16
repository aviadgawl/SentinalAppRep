///<refernce path="./common/config.js"/>
///<refernce path="./loginObjs.js"/>
///<refernce path="./login/loginService.js"/>

sentinalApp.directive('login', function (loginService) {
    return { 
        restrict: 'EA',
        link: function (scope) {
            var self = scope;
            self.onlineUser = new User();
            
            self.keepLoggedIn = false;
            
            self.login = function () {

                var isEmailValid = emailValidation(self.onlineUser.userEmail);

                if (isEmailValid) {
                    loginService.login(self.onlineUser).then(function (res) {

                        if (res) {
                            self.onlineUser.isLogged = true;
                            console.log(res)
                        }
                        else {
                            alert('Login failed!')
                        }
                    });
                }
            }// end of controller login function.
             
            self.loginFacebook = function () {
                loginService.loginFacebook(function (error, authData) {
                    scope.$apply(function () {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                             self.onlineUser.userToken = authData.token;
                            
                            loginService.verifyToken(self.onlineUser).then(function(res){
                               self.onlineUser.isLogged = res;
                            });
                        }
                    });//end of apply.
                   
                });
            }//end of facebook login.
             
            self.loginTwitter = function () {
                loginService.loginTwitter(function (error, authData) {
                    scope.$apply(function () {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                             self.onlineUser.userToken = authData.token;
                            
                            loginService.verifyToken(self.onlineUser).then(function(res){
                               self.onlineUser.isLogged = res;
                            });
                        }
                    });//end of apply.
                });
            }//end of twitter login.
             
            self.loginGoogle = function () {
                loginService.loginGoogle(function (error, authData) {
                    scope.$apply(function () {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                             self.onlineUser.userToken = authData.token;
                            
                            loginService.verifyToken(self.onlineUser).then(function(res){
                               self.onlineUser.isLogged = res;
                            });
                        }
                    });//end of apply.
                });
            }//end of google login.
             
            self.loginGithub = function () {
                loginService.loginGithub(function (error, authData) {
                    scope.$apply(function () {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            
                            console.log("Authenticated successfully with payload:", authData);
                            self.onlineUser.userToken = authData.token;
                            
                            loginService.verifyToken(self.onlineUser).then(function(res){
                               self.onlineUser.isLogged = res;
                            });
                            
                        }
                    });//end of apply.
                });
            }//end of github login.
             
            self.logout = function () {
                self.onlineUser.isLogged = false;
                self.onlineUser.userEmail = '';
                self.onlineUser.userPassword = '';
            }//end of logout.
            
        },// end of link.
        templateUrl: './login/loginDirTemp.html'
    }//end of return.
});// end of directive.