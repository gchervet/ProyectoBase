angular.module('app')
  .controller('homeController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

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
          Auth.tokenCookieExists();


          var testCallback = function (response) {
              debugger;
          };

          var testErrorCallback = function (response) {
              debugger;

          }

          utilityService.callHttp({ method: "GET", url: "/api/uniAlumno/GetByLegajo?legajo=12345", callbackSuccess: testCallback, callbackError: testErrorCallback });
      };

  });