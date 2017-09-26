angular.module('app')
  .controller('homeController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var homeController = this;
      homeController.menuGroupList = [];

      homeController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          homeController.userFullName = $sessionStorage.user.name;

          homeController.getAllMenu();

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

      homeController.getAllMenu = function () {
          Auth.tokenCookieExists();


          var getAllMenuCallback = function (response) {
              debugger;
              if (response) {
                  homeController.menuGroupList = response.data;
              }
          };

          var getAllMenuErrorCallback = function (response) {
              debugger;

          }

          utilityService.callHttp({ method: "GET", url: "/api/menu/getall", callbackSuccess: getAllMenuCallback, callbackError: getAllMenuErrorCallback });
      };

  });