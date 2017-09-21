angular.module('app')
  .controller('homeController', function ($scope, $rootScope, $location, $sessionStorage, Auth) {

      var homeController = this;

      homeController.init = function () {
          
          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          //if (Auth.userHasPermission(["administration"])) {
          //    var userName = Auth.currentUser().name;
          //}
          //else {
          //    homeController.logout();
          //}
      };

      homeController.logout = function () {

          Auth.logout();
          $location.path("/login");

      };

      homeController.requestTest = function () {
          debugger;
          Auth.tokenCookieExists();
      };

  });