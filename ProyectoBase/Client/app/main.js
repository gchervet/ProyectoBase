//Todo el contenido que tiene que ser configurado antes del despliegue
var app = angular.module("app", [
    'ngResource',
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'AuthServices'
]);

app.constant('myUrl', {
    base: "http://localhost:18725/" //Url base de WebApi
});

app.config(['$qProvider', '$stateProvider', '$urlRouterProvider',
    function ($qProvider, $stateProvider, $urlRouterProvider) {
        
        $qProvider.errorOnUnhandledRejections(false);

        $stateProvider.state('login', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: '/app/components/login/login.html',
                    controller: 'loginController as vm'
                }
            }
        }).state('main', {
            url: '/main',
            views: {
                'main': {
                    templateUrl: '/app/components/main/main.html',
                    controller: 'mainController as vm'
                }
            }
        })

    //$routeProvider
    //  .when('/login', {
    //      templateUrl: '#!/app/components/login/login.html',
    //      controller: 'loginController as vm'
    //  })
    //  .when('/home', {
    //      templateUrl: '#!/app/components/home/home.html',
    //      controller: 'homeController as vm',
    //      requiresAuthentication: true
    //  })
    //  .when('/main', {
    //      templateUrl: '#!/app/components/main/main.html',
    //      controller: 'mainController as vgmm',
    //      requiresAuthentication: true,
    //      permissions: ["administration"]
    //  })
    //  .when('#!/sales/orders', {
    //      templateUrl: 'views/sales/orders.html',
    //      controller: 'OrdersCtrl',
    //      requiresAuthentication: true,
    //      permissions: ["administration", "list_orders"]
    //  })
    //  .otherwise({ redirectTo: "/login" });

      $urlRouterProvider.otherwise("/login");

}]);

app.run(['myUrl','$rootScope', '$location', 'Auth',
    function (myUrl, $rootScope, $location, Auth) {

        // Setting the authorization Instance
        Auth.init();

        // Setting the authentication validation on every route change
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (!Auth.checkPermissionForView(next)) {
                event.preventDefault();
                $location.path("/login");
            }
        });

        // Setting service url
        $rootScope.myUrl = myUrl;

    }]);