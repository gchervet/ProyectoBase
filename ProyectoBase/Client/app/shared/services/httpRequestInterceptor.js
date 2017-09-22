angular.module('app')
    .factory('httpRequestInterceptor', ['$cookies',
        function ($cookies) {

            return {
                request: function ($config) {

                    $config.headers['Authorization'] = "Basic " + $cookies.get("sessionToken");
                    return $config;
                }
            };
        }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });