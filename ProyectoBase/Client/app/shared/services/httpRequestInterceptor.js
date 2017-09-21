angular.module('app')
    .factory('httpRequestInterceptor', ['$cookies',
        function ($cookies) {

            return {
                request: function ($config) {
                    debugger;
                    $config.headers['Authorization'] = "Basic " + $cookies.get("sessionToken");


                    return $config;
                }
            };
        }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });