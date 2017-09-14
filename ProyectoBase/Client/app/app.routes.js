angular.module("app")
.config([
    '$stateProvider',
    '$urlRouterProvider',
    'AuthServices',
    function (
        $stateProvider,
        $urlRouterProvider,
        AuthServices
        ) {

        /* PARA UTILIZAR ROUTEPROVIDER */
        $routeProvider
        .when('/login', {
            templateUrl: '/app/components/login/login.html',
            controller: 'loginController as vm'
        })
        .when('/home', {
            templateUrl: '/app/components/home/home.html',
            controller: 'homeController as vm',
            requiresAuthentication: true
        })
        .when('/main', {
            templateUrl: '/app/components/main/main.html',
            controller: 'mainController as vgmm',
            requiresAuthentication: true,
            permissions: ["administration"]
        })
        .when('/sales/orders', {
            templateUrl: 'views/sales/orders.html',
            controller: 'OrdersCtrl',
            requiresAuthentication: true,
            permissions: ["administration", "list_orders"]
        })

        /* PARA UTILIZAR STATEPROVIDER */
        //$stateProvider.state('login', {
        //    url: '/login',
        //    views: {
        //        'main': {
        //            templateUrl: '/app/components/login/login.html',
        //            controller: 'loginController as vm'
        //        }
        //    }
        //});
        //$urlRouterProvider.otherwise("/login");
    }]);