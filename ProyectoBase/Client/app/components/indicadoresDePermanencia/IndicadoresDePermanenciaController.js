angular.module('app')
  .controller('indicadoresDePermanenciaController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var indicadoresDePermanenciaController = this;

      indicadoresDePermanenciaController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          indicadoresDePermanenciaController.loadLists();
          indicadoresDePermanenciaController.loadPersonMethods();
          indicadoresDePermanenciaController.loadGrids();
      };

      indicadoresDePermanenciaController.loadLists = function () {

          indicadoresDePermanenciaController.legajoSelected = null;
          indicadoresDePermanenciaController.nombreSelected = null;
          indicadoresDePermanenciaController.apellidoSelected = null;
          indicadoresDePermanenciaController.dniSelected = null;

          indicadoresDePermanenciaController.cicloSelected = null;
          indicadoresDePermanenciaController.cuatrimestreSelected = null;
          indicadoresDePermanenciaController.sedeSelected = null;
          indicadoresDePermanenciaController.carreraSelected = null;
          indicadoresDePermanenciaController.kpiSelected = null;
          indicadoresDePermanenciaController.nivelDeRiesgoSelected = null;

          indicadoresDePermanenciaController.cicloList = [1];
          indicadoresDePermanenciaController.cuatrimestreList = [1, 2];
          indicadoresDePermanenciaController.sedeList = [1];
          indicadoresDePermanenciaController.carreraList = [1];
          indicadoresDePermanenciaController.kpiList = [1];
          indicadoresDePermanenciaController.nivelDeRiesgoList = [1];

      };

      indicadoresDePermanenciaController.loadPersonMethods = function () {
          indicadoresDePermanenciaController.legajoSelected = null;
          indicadoresDePermanenciaController.legajoList = [
              { legajo: "12334", nombre: "Gonzalo Germán", apellido: "Chervet" , dni:"37375737"},
              { legajo: "87922", nombre: "Marcelo Daniel", apellido: "Martini" , dni:"19195419"},
              { legajo: "99876", nombre: "Gustavo Martin", apellido: "Blumberg", dni:"46467979" }];

          indicadoresDePermanenciaController.legajoWasSelected = function (select) {
              indicadoresDePermanenciaController.legajoSelected = select.originalObject;

              indicadoresDePermanenciaController.nombreSelected = select.originalObject.nombre;
              indicadoresDePermanenciaController.apellidoSelected = select.originalObject.apellido;
              indicadoresDePermanenciaController.dniSelected = select.originalObject.dni;

          };

          indicadoresDePermanenciaController.legajoInputChanged = function (str) {
              if (str.length >= 2) {
              }
          };

      };

      indicadoresDePermanenciaController.loadGrids = function () {

          indicadoresDePermanenciaController.resultList = [{
              'col1': '1.1',
              'col2': '1.2',
              'nested': [{
                  'col3': '1.3',
                  'col4': '1.4',
                  'col5': '1.5'
              },
              {
                  'col3': '1.3',
                  'col4': '1.4',
                  'col5': '1.5'
              },
              {
                  'col3': '1.3',
                  'col4': '1.4',
                  'col5': '1.5'
              },
              {
                  'col3': '1.3',
                  'col4': '1.4',
                  'col5': '1.5'
              }]
          }, {
              'col1': '2.1',
              'col2': '2.2',
              'nested': [{
                  'col3': '2.3',
                  'col4': '2.4',
                  'col5': '2.5'
              }]
          }, {
              'col1': 'lucy',
              'col2': 'ivan',
              'nested': [{
                  'col3': 'garry',
                  'col4': 'jules',
                  'col5': 'larry',
                  'other': [{
                      'col6': 'garry',
                      'col7': 'jules',
                  }]
              }]
          }];

          $('#administracionTable').bootstrapTable({

              columns: [{
                  field: 'Legajo',
                  title: 'Legajo'
              }, {
                  field: 'Nombre',
                  title: 'Nombre'
              }, {
                  field: 'Apellido',
                  title: 'Apellido'
              }, {
                  field: 'DNI',
                  title: 'DNI'
              }, {
                  field: 'Carrera',
                  title: 'Carrera'
              }, {
                  field: 'Ciclo',
                  title: 'Ciclo'
              }, {
                  field: 'Cuatrimestre',
                  title: 'Cuatrimestre'
              }, {
                  field: 'Inasistencia',
                  title: 'Inasistencia'
              }, {
                  field: 'Examenes',
                  title: 'Exámenes'
              }, {
                  field: 'FinalesReprobados',
                  title: 'Finales reprobados'
              }],
              data: indicadoresDePermanenciaController.resultList,
              detailView: true,
              onExpandRow: function (index, row, $detail) {
                  console.log(row)
                  $detail.html('<table></table>').find('table').bootstrapTable({
                      columns: [{
                          field: 'Materia',
                          title: 'Materia'
                      }, {
                          field: 'Inasistencia',
                          title: 'Inasistencia'
                      }, {
                          field: 'Examenes',
                          title: 'Exámenes'
                      }, {
                          field: 'FinalesReprobados',
                          title: 'Finales reprobados'
                      }],
                      data: row.nested,
                      // Simple contextual, assumes all entries have further nesting
                      // Just shows example of how you might differentiate some rows, though also remember row class and similar possible flags
                      detailView: row.nested[0]['other'] !== undefined
                      //Para agregar otra más (BORRAR)
                      /*,onExpandRow: function (indexb, rowb, $detailb) {
                          $detailb.html('<table></table>').find('table').bootstrapTable({
                              columns: [{
                                  field: 'col6',
                                  title: 'Col6'
                              }, {
                                  field: 'col7',
                                  title: 'Col7'
                              }],
                              data: rowb.other
                          });
                      }*/
                  });

              }
          });
      };
  });