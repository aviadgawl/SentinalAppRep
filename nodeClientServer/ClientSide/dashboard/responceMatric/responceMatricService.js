sentinalApp.service('responceMatricService', function ($http, $q) {
    var self = this;

    self.getResponceTimeMatric = function (userTokenParam , durQuaryParam) {
        var deferred = $q.defer();
        
        return $http.post('http://localhost:4000/responceMatricResponceTime', { userInfo: { token:userTokenParam , durQuary: durQuaryParam}}).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }

    self.getResponceMatricStatusCode = function (userTokenParam , durQuaryParam) {
        var deferred = $q.defer();

        return $http.post('http://localhost:4000/responceMatricStatusCode', { userInfo: userTokenParam , userDurQuary: durQuaryParam }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }

});