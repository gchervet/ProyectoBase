angular.module('app')
  .controller('crearCursoAisladoController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var crearCursoAisladoController = this;

      // Variables para mapeo de selección
      crearCursoAisladoController.carrera = null;
      crearCursoAisladoController.materia = null;
      crearCursoAisladoController.modalidad = null;

      // Listas que se llenarán para los combos
      crearCursoAisladoController.carreraList = [];
      crearCursoAisladoController.materiaList = [];
      crearCursoAisladoController.modalidadList = [];

      crearCursoAisladoController.edificioList = [{name:1, code:2}];
      crearCursoAisladoController.diaList = [{ name: 1, code: 2 }];
      crearCursoAisladoController.aulaList = [{ name: 1, code: 2 }];
      crearCursoAisladoController.horaDesdeList = [{ name: 1, code: 2 }];
      crearCursoAisladoController.horaHastaList = [{ name: 1, code: 2 }];
      crearCursoAisladoController.cantClasesList = [{ name: 1, code: 2 }];

      // Listas originales para trabajar en memoria
      crearCursoAisladoController.carreraOriginal = null;
      crearCursoAisladoController.carreraOriginalList = [];
      crearCursoAisladoController.materiaOriginalList = [];
      crearCursoAisladoController.modalidadOriginalList = [];

      crearCursoAisladoController.horarioList = [{}];

      /* CARRERA */
      crearCursoAisladoController.getCarreraList = function () {

          var getCarreraListCallback = function (response) {
              if (response) {

                  crearCursoAisladoController.carreraOriginalList = response.data;
                  for (i in response.data) {
                      var actualCarrera = response.data[i];
                      if (actualCarrera.Nombre && actualCarrera.Publicar) {
                          crearCursoAisladoController.carreraList.push({ name: actualCarrera.Nombre, code: actualCarrera.Codigo, modalidadList: actualCarrera.ModalidadList });
                      }
                  }
              }
          };

          var getCarreraListErrorCallback = function (response) {

          }

          utilityService.callHttp({ method: "GET", url: "/api/UniEscuela/GetAll", callbackSuccess: getCarreraListCallback, callbackError: getCarreraListErrorCallback });
      }
      
      crearCursoAisladoController.carreraOnChange = function () {

          if (crearCursoAisladoController.carrera) {

              // Generar lista de materias
              crearCursoAisladoController.getMateriaList(carrera.Codigo);

              // Generar lista de modalidad
              crearCursoAisladoController.getModalidadList();
          }
      };

      /* MODALIDAD */      
      crearCursoAisladoController.carreraOnChange = function () {

          crearCursoAisladoController.modalidadList = [];

          if (crearCursoAisladoController.carreraOriginalList) {
              for (i in crearCursoAisladoController.carreraOriginalList) {
                  var actualCarreraOriginal = crearCursoAisladoController.carreraOriginalList[i];

                  if (actualCarreraOriginal.Codigo == crearCursoAisladoController.carrera) {

                      if (actualCarreraOriginal.ModalidadList) {
                          
                          for (z in actualCarreraOriginal.ModalidadList) {
                              actualModalidad = actualCarreraOriginal.ModalidadList[z];
                              crearCursoAisladoController.modalidadList.push({ name: actualModalidad.CodigoModalidad, code: actualModalidad.CodigoEscuela });
                          }
                          break;
                      }
                  }
              }
          }
      };

      /* CURSO */
      crearCursoAisladoController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          crearCursoAisladoController.getCarreraList();
      };
  });