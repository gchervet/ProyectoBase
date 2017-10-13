angular.module('app')
  .controller('crearCursoAisladoController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var crearCursoAisladoController = this;

      // Variables para mapeo de selección
      crearCursoAisladoController.planSearchText = '';
      crearCursoAisladoController.planSeleccionado = {};
      crearCursoAisladoController.carreraSeleccionada = {};
      crearCursoAisladoController.materiaSeleccionada = {};
      crearCursoAisladoController.modalidadSeleccionada = {};

      // Listas que se llenarán para los combos
      crearCursoAisladoController.carreraList = [];
      crearCursoAisladoController.materiaList = [];
      crearCursoAisladoController.modalidadList = [];

      crearCursoAisladoController.edificioList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];
      crearCursoAisladoController.diaList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];
      crearCursoAisladoController.aulaList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];
      crearCursoAisladoController.horaDesdeList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];
      crearCursoAisladoController.horaHastaList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];
      crearCursoAisladoController.cantClasesList = [{ name: 1, code: 1 }, { name: 2, code: 2 }, { name: 3, code: 3 }];

      // Listas originales para trabajar en memoria
      crearCursoAisladoController.carreraOriginal = null;
      crearCursoAisladoController.carreraOriginalList = [];
      crearCursoAisladoController.materiaOriginalList = [];
      crearCursoAisladoController.modalidadOriginalList = [];

      crearCursoAisladoController.horarioList = [{ edificio: null, dia: null, aula: null, horaDesde: null, horaHasta: null, cantClases: null }];


      /* 1. PLAN */
      crearCursoAisladoController.getPlanList = function () {

          var getPlanListCallback = function (response) {
              if (response) {
                  crearCursoAisladoController.carreraOriginalList = response.data;
                  for (i in response.data) {
                      var actualPlan = response.data[i];
                      crearCursoAisladoController.carreraList.push({ name: "(" + actualPlan.CodCar + ") " + actualPlan.NombreCarrera, code: actualPlan.CodCar, modalidadList: actualPlan.ModalidadList });

                  }
              }
          };

          var getPlanListErrorCallback = function (response) {

          }

          utilityService.callHttp({ method: "GET", url: "/api/UniPlan/GetAll", callbackSuccess: getPlanListCallback, callbackError: getPlanListErrorCallback });
      }

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

      /* MODALIDAD */
      crearCursoAisladoController.carreraOnChange = function (item) {

          crearCursoAisladoController.modalidadList = [];

          /* Cargar materias */
          if (item) {
              crearCursoAisladoController.getMateriaList(item)
          }


          /* Cargar modalidades */
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

      /* MATERIA */
      crearCursoAisladoController.getMateriaList = function (codcar) {

          var getMateriaListCallback = function (response) {
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

          var getMateriaListErrorCallback = function (response) {

          }

          utilityService.callHttp({ method: "GET", url: "/api/UniPlan/GetPlanByCodigoCarrera?codcar=" + codcar, callbackSuccess: getMateriaListCallback, callbackError: getMateriaListErrorCallback });
      }


      /* CURSO */
      crearCursoAisladoController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          crearCursoAisladoController.getPlanList();
      };


      //TODO LLEVAR A UN JAVASCRIPT APARTE
      crearCursoAisladoController.replaceSpecialCharacters = function (str) {

          var rtn = str.replace("á", "a");
          rtn = rtn.replace("é", "e");
          rtn = rtn.replace("í", "i");
          rtn = rtn.replace("ó", "o");
          rtn = rtn.replace("ú", "u");

          return rtn;
      }
      crearCursoAisladoController.createFilterFor = function (query, searchList) {

          var lowercaseQuery = angular.lowercase(query);
          var replacedQuery = crearCursoAisladoController.replaceSpecialCharacters(lowercaseQuery);

          return function filterFn(searchList) {

              var searchListCode = searchList.name.toLowerCase();
              searchListCode = crearCursoAisladoController.replaceSpecialCharacters(searchListCode);

              return (searchListCode.indexOf(replacedQuery) != -1);
          };

      }
      crearCursoAisladoController.querySearch = function (query, searchList) {
          var results = query ? searchList.filter(crearCursoAisladoController.createFilterFor(query, searchList)) : searchList, deferred;
          return results;
      }

  });