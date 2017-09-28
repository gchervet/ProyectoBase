angular.module('app')
  .controller('matriculacionYArancelamientoController', function ($scope, $rootScope, $location, Auth) {

      var mainController = this;

      mainController.init = function () {
          debugger;

          Auth.tokenCookieExists();

          //if (Auth.userHasPermission(["administration"])) {
          //    var userName = Auth.currentUser().name;
          //}
      };

  });