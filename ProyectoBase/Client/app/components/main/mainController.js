angular.module('app')
  .controller('mainController', function ($scope, $rootScope, $location, Auth) {

      $rootScope.logout = function () {
          Auth.logout();
          $location.path("/login");
      };

  });