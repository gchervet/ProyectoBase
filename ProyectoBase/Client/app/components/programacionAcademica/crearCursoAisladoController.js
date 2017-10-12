angular.module('app')
  .controller('crearCursoAisladoController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var crearCursoAisladoController = this;

      // Seteo de Drag and Drop (Dragula)
      dragula([document.getElementById('left'), document.getElementById('right')]);

      // Variables para mapeo de selección
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
      crearCursoAisladoController.carreraOnChange = function () {
          debugger;
          crearCursoAisladoController.modalidadList = [];

          /* Cargar materias */
          if (crearCursoAisladoController.carrera) {
              crearCursoAisladoController.getMateriaList(crearCursoAisladoController.carrera + "00")
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

          //crearCursoAisladoController.getCarreraList();
          crearCursoAisladoController.getPlanList();
      };


      // LLEVAR A UN JAVASCRIPT APARTE // MEJORAR EL INPUT PARA QUE EL FILTRO ESTE DIRECTAMENTE ESCRITO
      $.fn.bsDropDownFilter = function (options) {

          return this.filter(".dropdown-menu").each(function () {
              var opts = $.extend({}, $.fn.bsDropDownFilter.defaults, options);
              var $this, $li, $search, $droplist;

              $this = $(this).css({
                  'overflow-x': 'auto',
                  'max-height': 450
              });

              opts.label = $this.data('filter-label') || opts.label;

              $this.parent().on('shown.bs.dropdown', function (e) {
                  $this = $(this);
                  $this.find('.dropdown-filter input').focus();
                  $this.find('li').show();
              }).on('hide.bs.dropdown', function (e) {
                  $(this).find('.dropdown-filter input').val('');
              });

              $li = $('<li role="presentation" class="dropdown-filter"></li>').prependTo($this);

              $search = $('<input type="search" class="form-control" placeholder="' + opts.label + '" style="width:96%; margin:0 auto" />')
                  .data('dropdownList', $this)
                  .bind('click', function (e) {
                      e.stopPropagation();
                  })
                  .bind('keyup', function () {
                      $droplist = $(this).data('dropdownList');
                      $droplist.find('li').show();
                      $droplist.find('li:not(:filter("' + this.value + '"))').not('.dropdown-filter').hide();
                  })
                  .prependTo($li);
          });
      };

      $.fn.bsDropDownFilter.defaults = {
          label: 'Filter by:'
      };

      $('[data-filter], .dropdown-filter').bsDropDownFilter();

      // Create a FILTER pseudo class. Like CONTAINS, but case insensitive
      $.expr[":"].filter = $.expr.createPseudo(function (arg) {
          return function (elem) {
              /*global Diacritics*/
              return Diacritics.clean($(elem).text()).toUpperCase().indexOf(Diacritics.clean(arg).toUpperCase()) >= 0;
          };
      });
  });