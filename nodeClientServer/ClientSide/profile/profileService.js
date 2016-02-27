sentinalApp.service('profileService' , function ($http ,$q) {
    var self = this;
    
    self.changePassword = function (oldPasswordParam , newPasswordParam , emailParam) {
        var deferred = $q.defer();
        
        return $http.post('http://localhost:4000/changePassword',
         { userInfo: { oldPassword: oldPasswordParam , newPassword: newPasswordParam , email: emailParam}}).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }
    
});