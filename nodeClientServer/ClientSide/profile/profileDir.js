sentinalApp.directive('profile' , function (profileService) {
    return {
      restrict:'EA',
      controller:'mainCtrl',
      templateUrl:'./profile/profileDirTemp.html',
      link: function (scope) {
          var self = scope;
          self.newPassword = '';
          self.oldPassword = '';
          self.changePassword = function(){
              profileService.changePassword(self.oldPassword , self.newPassword , self.onlineUser.userEmail)
              .then(function(res){
                  alert(res.data);
                  self.newPassword = '';
                  self.oldPassword = '';
              } , function(error){
                  alert(error.data);
              });
          }//end of change password.
      }  
    };
});