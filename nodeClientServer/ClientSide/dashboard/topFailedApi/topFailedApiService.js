sentinalApp.service('topFailedApiService', function ($http, $q) {
    var self = this;

    self.getAllTopFaliedApi = function (userTokenParam) {
        var deferred = $q.defer();

        return $http.post('http://localhost:4000/allTopfaliedApi', { userInfo: { token: userTokenParam} }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }
    
    self.getTopFaliedApi = function (userTokenParam , userQuaryParam) {
        var deferred = $q.defer();

        return $http.post('http://localhost:4000/topfaliedApiData', { userInfo: { token: userTokenParam , quary:userQuaryParam} }).
            success(function (res) {
                deferred.resolve(res.data);
            })
            .error(function (res) {
                deferred.reject();
            });

        return deferred.promise;
    }
});