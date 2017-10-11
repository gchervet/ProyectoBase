angular.module('app')
  .controller('crearCursoAisladoController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var crearCursoAisladoController = this;
      
      /* COMIENZO muuri */
      var docElem = document.documentElement;
      var kanban = document.querySelector('.kanban-demo');
      var board = kanban.querySelector('.board');
      var itemContainers = Array.prototype.slice.call(kanban.querySelectorAll('.board-column-content'));
      var columnGrids = [];
      var dragCounter = 0;
      var boardGrid;

      itemContainers.forEach(function (container) {

          var muuri = new Muuri(container, {
              items: '.board-item',
              layoutDuration: 400,
              layoutEasing: 'ease',
              dragEnabled: true,
              dragSortInterval: 0,
              dragSortGroup: 'column',
              dragSortWith: 'column',
              dragContainer: document.body,
              dragReleaseDuration: 400,
              dragReleaseEasing: 'ease'
          })
          .on('dragStart', function (item) {
              ++dragCounter;
              docElem.classList.add('dragging');
              item.getElement().style.width = item.getWidth() + 'px';
              item.getElement().style.height = item.getHeight() + 'px';
          })
          .on('dragEnd', function (item) {
              if (--dragCounter < 1) {
                  docElem.classList.remove('dragging');
              }
          })
          .on('dragReleaseEnd', function (item) {
              item.getElement().style.width = '';
              item.getElement().style.height = '';
              columnGrids.forEach(function (muuri) {
                  muuri.refreshItems();
              });
          })
          .on('layoutStart', function () {
              boardGrid.refreshItems().layout();
          });

          debugger;
          columnGrids.push(muuri);

      });

      boardGrid = new Muuri(board, {
          layoutDuration: 400,
          layoutEasing: 'ease',
          dragEnabled: true,
          dragSortInterval: 0,
          dragStartPredicate: {
              handle: '.board-column-header'
          },
          dragReleaseDuration: 400,
          dragReleaseEasing: 'ease'
      });
      /* FIN muuri */

      // Variables para mapeo de selección
      crearCursoAisladoController.carrera = null;
      crearCursoAisladoController.materia = null;
      crearCursoAisladoController.modalidad = null;

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

      crearCursoAisladoController.horarioList = [{ edificio: null, dia: null, aula: null, horaDesde: null, horaHasta: null, cantClases: null}];

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