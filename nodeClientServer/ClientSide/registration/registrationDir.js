sentinalApp.directive('registration', function (registrationService) {
    return {
        restrict: 'EA',
        link: function (scope) {
            var self = scope;
            self.regUser = new User();
            
            scope.registrate = function () {
                
                var isEmailValid = emailValidation(scope.regUser.userEmail);
                var isPasswordValid = passwordValidation(scope.regUser.userPassword);
                    
                if (isEmailValid && isPasswordValid) {//if email and password are valid

                    registrationService.registrate(self.regUser).then(function (res) {
                        if(res){ alert(res)}
                        else{ alert('res is null')}
                        
                    });//end of registrationService.registrate
                    
                }
                else{//if email and password are not valid.
                    alert('not valid password or email');
                }//end of validations if.

            }// end of controller login function.
        },// end of controller.
        //controllerAs: 'regCtrl',
        templateUrl: './registration/registrationDirTemp.html'
    }//end of return.
});// end of directive.
