sentinalApp.service('snapshotService',function ($http , $q) {
    var self = this;
    
     self.snapshot = function (userTokenParam , emailToSendParam , image64Param ) {
        var deferred = $q.defer();
        
        return $http.post('http://localhost:4000/snapshot', { 
            userInfo: {
                 token:userTokenParam ,
                  email: emailToSendParam , 
                  image:image64Param
                 }
                 }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }
});