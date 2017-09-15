angular.module("app", [
    "ui.router", 
    "ui.bootstrap"
])
.run(['myUrl', '$rootScope', '$location', 'Auth',
    function (myUrl, $rootScope, $location, Auth) {

        // Setting the authorization Instance
        Auth.init();

        // Setting the authentication validation on every route change
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!Auth.checkPermissionForView(next)) {
                event.preventDefault();
                $location.path("/login");
            }
        });

        // Setting service url
        $rootScope.myUrl = myUrl;
  
}]);