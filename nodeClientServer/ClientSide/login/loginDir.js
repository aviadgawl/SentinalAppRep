///<refernce path="./common/config.js"/>
///<refernce path="./loginObjs.js"/>
///<refernce path="./login/loginService.js"/>

sentinalApp.directive('login', function (loginService, localStorageService) {
    return {
        restrict: 'EA',
        controller: 'mainCtrl',
        link: function (scope) {
            var self = scope;
            self.onlineUser = new User();
            self.onlineUser.isLogged = localStorageService.isAuth(self.globalClientKey);
            self.keepLoggedIn = false;

            self.login = function () {

                var isEmailValid = emailValidation(self.onlineUser.userEmail);

                if (isEmailValid) {
                    loginService.login(self.onlineUser).then(function (res) {

                        if (res) {
                            self.onlineUser.isLogged = true;
                            //self.globalClientKey = self.onlineUser.userEmail;
                            localStorageService.add(self.globalClientKey, res.data);
                            
                            console.log(res)
                        }
                        else {
                            alert('Login failed!')
                        }
                    }, function (error) {
                        alert('server error: ' + error.data + " | " + error.status);
                    });
                }
            }// end of login function.
             
             self.resetPassword = function(){
                 
                 if(self.onlineUser.userEmail){
                 loginService.resetPassword(self.onlineUser).then(function(res){alert(res.data) } , function(error){ alert(error.data)} )
                 }
                 else{
                     alert('Enter user email');
                 }
             }//end of resert password.
             
            self.loginFacebook = function () {
                loginService.loginFacebook(function (error, authData) {
                    scope.$apply(function () {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                            self.onlineUser.userToken = authData.token;

                            loginService.verifyToken(self.onlineUser).then(function (res) {
                                localStorageService.add(self.globalClientKey, authData.token);
                                location.reload();
                            }, function (error) {
                                alert('server error: ' + error.data + " | " + error.status);
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

                            loginService.verifyToken(self.onlineUser).then(function (res) {
                                localStorageService.add(self.globalClientKey, authData.token);
                                location.reload();
                            }, function (error) {
                                alert('server error: ' + error.data + " | " + error.status);
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

                            loginService.verifyToken(self.onlineUser).then(function (res) {
                                localStorageService.add(self.globalClientKey, authData.token);
                                location.reload();
                            }, function (error) {
                                alert('server error: ' + error.data + " | " + error.status);
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
                            
                            loginService.verifyToken(self.onlineUser).then(function (res) {
                                localStorageService.add(self.globalClientKey, authData.token);
                                location.reload();
                            }, function (error) {
                                alert('server error: ' + error.data + " | " + error.status);
                            });

                        }
                    });//end of apply.
                });
            }//end of github login.
             
            self.logout = function () {
                self.onlineUser.isLogged = false;
                self.onlineUser.userEmail = '';
                self.onlineUser.userPassword = '';
                localStorageService.remove(self.globalClientKey);
            }//end of logout.
            
        },// end of link.
        templateUrl: './login/loginDirTemp.html'
    }//end of return.
});// end of directive.