sentinalApp.directive('registration', function (registrationService) {
    return {
        restrict: 'EA',
        link: function (scope) {
            var self = scope;
            self.regUser = new User();
            
            self.registrate = function () {
                
                var isEmailValid = emailValidation(self.regUser.userEmail);
                var isPasswordValid = passwordValidation(self.regUser.userPassword);
                var isFull = self.regUser.userName != null && self.regUser.userThemeColor != null;
                if (isEmailValid && isPasswordValid && isFull) {//if email and password are valid
                    
                    registrationService.registrate(self.regUser).then(function (res) {
                        if(res.flag){ alert(res.flag)}
                        else{ alert(res.message)}
                        
                    } , function(error){
                         alert('server error: ' + error.data + " | " + error.status);
                    });//end of registrationService.registrate
                    
                }
                else{//if email and password are not valid.
                    alert('not valid password or email or missing info');
                }//end of validations if.

            }// end of controller login function.
        },// end of controller.
        //controllerAs: 'regCtrl',
        templateUrl: './registration/registrationDirTemp.html'
    }//end of return.
});// end of directive.
