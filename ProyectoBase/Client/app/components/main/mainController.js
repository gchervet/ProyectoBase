angular.module('app')
  .controller('mainController', function ($scope, $rootScope, $location, Auth) {

      var mainController = this;

      mainController.init = function () {

          debugger;
          if (Auth.userHasPermission(["administration"])) {
              // some evil logic here
              var userName = Auth.currentUser().name;
              // ...
          }
      };

      $rootScope.logout = function () {
          Auth.logout();
          $location.path("/login");
      };

  });