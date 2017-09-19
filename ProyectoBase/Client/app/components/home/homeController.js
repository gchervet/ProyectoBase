angular.module('app')
  .controller('homeController', function ($scope, $rootScope, $location, $sessionStorage, Auth) {

      var homeController = this;

      homeController.init = function () {

          debugger;

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          if (Auth.userHasPermission(["administration"])) {
              // some evil logic here
              var userName = Auth.currentUser().name;
              // ...
          }
          else {
              homeController.logout();
          }
      };

      homeController.logout = function () {

          Auth.logout();
          $location.path("/login");
      };
  });