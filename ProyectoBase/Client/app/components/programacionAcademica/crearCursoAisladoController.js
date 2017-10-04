angular.module('app')
  .controller('crearCursoAisladoController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var crearCursoAisladoController = this;

      crearCursoAisladoController.init = function () {

          Auth.tokenCookieExists();
          debugger;
          crearCursoAisladoController.carreraList =
              [
                   {
                       name: "CARRERA 1",
                       code: "C1"
                   },
                   {
                       name: "CARRERA 2",
                       code: "C2"
                   },
                   {
                       name: "CARRERA 3",
                       code: "C3"
                   },
                   {
                       name: "CARRERA 4",
                       code: "C4"
                   }
              ];


          crearCursoAisladoController.materiaList =
              [
                   {
                       name: "MATERIA 1",
                       code: "M1"
                   },
                   {
                       name: "MATERIA 2",
                       code: "M2"
                   },
                   {
                       name: "MATERIA 3",
                       code: "M3"
                   },
                   {
                       name: "MATERIA 4",
                       code: "M4"
                   }
              ];

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }
      };
  });