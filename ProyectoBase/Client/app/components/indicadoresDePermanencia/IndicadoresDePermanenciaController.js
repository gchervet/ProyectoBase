angular.module('app')
  .controller('indicadoresDePermanenciaController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var indicadoresDePermanenciaController = this;

      currentTabPrefix = 'adm';

      indicadoresDePermanenciaController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          // Variable toggle de las tabs
          $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {

              if (currentTabPrefix == 'adm') {
                  currentTabPrefix = 'aca';
              } else {
                  currentTabPrefix = 'adm';
              }
          });

          indicadoresDePermanenciaController.loadRequestMethods();
          indicadoresDePermanenciaController.loadLists();
          indicadoresDePermanenciaController.loadPersonMethods();
          indicadoresDePermanenciaController.loadGrids();
      };

      indicadoresDePermanenciaController.loadRequestMethods = function () {

          indicadoresDePermanenciaController.getErrorCallback = function (response) {
              alert(response);
          }

          indicadoresDePermanenciaController.getRegionalListCallback = function (response) {
              if (response) {
                  for (i in response.data) {
                      var actualSede = response.data[i];
                      indicadoresDePermanenciaController.sedeList.push(
                                {
                                    name: actualSede.Nombre,
                                    code: actualSede.Codigo,
                                    customName: actualSede.NombreCustom
                                });
                  }
              }
          };

          indicadoresDePermanenciaController.getPlanListCallback = function (response) {
              if (response) {
                  for (i in response.data) {
                      var actualPlan = response.data[i];
                      if (actualPlan && actualPlan.CodCar && actualPlan.NombreCarrera) {
                          indicadoresDePermanenciaController.planList.push(
                                    {
                                        name: "(" + actualPlan.CodCar + ") " + actualPlan.NombreCarrera,
                                        code: actualPlan.CodCar,
                                        modalidadList: actualPlan.ModalidadList
                                    });
                      }
                  }
              }
          };

          // KPI Morosos
          indicadoresDePermanenciaController.getKPIMorosoListCallback = function (response) {
              if (response) {
                  for (i in response.data) {

                      var actualKPIMoroso = response.data[i],
                          valorDeDeuda = '';

                      if (actualKPIMoroso.DeudaToal >= $rootScope.KPI_DEUDA_LIMITE_MAYOR) {
                          valorDeDeuda = 'ALTO';
                      }
                      if ($rootScope.KPI_DEUDA_LIMITE_MENOR < actualKPIMoroso.DeudaToal && actualKPIMoroso.DeudaToal < $rootScope.KPI_DEUDA_LIMITE_MAYOR) {
                          valorDeDeuda = 'MEDIO';
                      }
                      if (actualKPIMoroso.DeudaToal <= $rootScope.KPI_DEUDA_LIMITE_MENOR) {
                          valorDeDeuda = 'BAJO';
                      }
                      indicadoresDePermanenciaController.administracionResultList.push({

                          Legajo: actualKPIMoroso.Legajo,
                          Nombre: actualKPIMoroso.Nombre,
                          Apellido: actualKPIMoroso.Apellido,
                          DNI: actualKPIMoroso.Dni,
                          Carrera: actualKPIMoroso.Carrera,
                          Ciclo: null,
                          Cuatrimestre: null,
                          ValorDeDeuda: valorDeDeuda,
                          DeudaMonto: actualKPIMoroso.DeudaToal,

                      })
                  }

                  $('#administracionTable').bootstrapTable('load', indicadoresDePermanenciaController.administracionResultList);
              }
          };

          // KPI Inasistencias
          indicadoresDePermanenciaController.getKPIInasistenciaListCallback = function (response) {
              if (response) {

                  indicadoresDePermanenciaController.academicoResultList = [];

                  var actualLegajo, previousLegajo, nuevaInasistencia = null, nuevaInasistenciaCreada = false, cantALTO = 0, cantMEDIO = 0, cantBAJO = 0;

                  for (i in response.data) {
                      var index = Number(i);
                      var actualKPIInasistencia = response.data[index];

                      actualLegajo = actualKPIInasistencia.Legajo;

                      nuevaMateria = {
                          Inasistencia: actualKPIInasistencia.Inansistencia,
                          Materia: actualKPIInasistencia.Materia,
                      };

                      if (((previousLegajo && actualLegajo != previousLegajo) || (!nuevaInasistencia)) && !nuevaInasistenciaCreada) {

                          var inasistenciaTexto = '';
                          if (actualKPIInasistencia.Promedio >= $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR) {
                              inasistenciaTexto = 'ALTO';
                              cantALTO++;
                          }
                          if (actualKPIInasistencia.Promedio > $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR && actualKPIInasistencia.Promedio < $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR) {
                              inasistenciaTexto = 'MEDIO';
                              cantMEDIO++;
                          }
                          if (actualKPIInasistencia.Promedio <= $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR) {
                              inasistenciaTexto = 'BAJO';
                              cantBAJO++;
                          }

                          nuevaInasistencia = {
                              Legajo: actualKPIInasistencia.Legajo,
                              Nombre: actualKPIInasistencia.Nombre,
                              Apellido: actualKPIInasistencia.Apellido,
                              DNI: actualKPIInasistencia.Dni,
                              Carrera: actualKPIInasistencia.Carrera,
                              Ciclo: actualKPIInasistencia.Ciclo,
                              Cuatrimestre: actualKPIInasistencia.Cuatri,
                              CorreoElectronico: actualKPIInasistencia.Mail,
                              Telefono: actualKPIInasistencia.Telefono,
                              MaxNroClase: actualKPIInasistencia.MaxNroClase,
                              Promedio: actualKPIInasistencia.Promedio,
                              Inasistencia: inasistenciaTexto + ' (' + Math.round(actualKPIInasistencia.Promedio) + '%)',
                              TotalDeInasistencias: actualKPIInasistencia.TotalDeInasistencias,
                              nested: []
                          }
                          nuevaInasistenciaCreada = true;
                      }
                      nuevaInasistencia.nested.push(nuevaMateria);

                      if ((response.data[index + 1] && response.data[index + 1].Legajo != actualLegajo) || !response.data[index + 1]) {

                          // Si no hay filtro KPI
                          if (indicadoresDePermanenciaController.aca_kpiSelected == '') {
                              indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                          }
                              // Si hay filtro KPI - Inasistencias
                          else if (indicadoresDePermanenciaController.aca_kpiSelected == 'Inasistencias') {
                              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == '' ||
                                  indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected.toLowerCase() == inasistenciaTexto.toLowerCase()) {
                                  indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                              }
                          }
                              // Si hay filtro KPI - Exámenes reprobados
                          else if (indicadoresDePermanenciaController.aca_kpiSelected == 'Exámenes reprobados') {
                              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == '' ||
                                  indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected.toLowerCase() == inasistenciaTexto.toLowerCase()) {
                                  indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                              }
                          }
                              // Si hay filtro KPI - Inasistencias
                          else if (indicadoresDePermanenciaController.aca_kpiSelected == 'Finales reprobó') {
                              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == '' ||
                                  indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected.toLowerCase() == inasistenciaTexto.toLowerCase()) {
                                  indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                              }
                          }

                          previousLegajo = actualLegajo;
                          nuevaInasistencia = null;
                          nuevaInasistenciaCreada = false;

                      }
                  }
                  $('#academicoTable').bootstrapTable('load', indicadoresDePermanenciaController.academicoResultList);
                  indicadoresDePermanenciaController.loadCharts([{ 'label': 'ALTO', 'value': cantALTO.toString() }, { 'label': 'MEDIO', 'value': cantMEDIO.toString() }, { 'label': 'BAJO', 'value': cantBAJO.toString() }]);
              }
          };

          indicadoresDePermanenciaController.getLegajoListCallback = function (response) {
              if (response) {
                  for (i in response.data) {
                      var actualLegajo = response.data[i];
                      indicadoresDePermanenciaController.legajoList.push(actualLegajo.LegajoDefinitivo);
                  }

                  $("#aca_comboLegajo").autocomplete({ source: indicadoresDePermanenciaController.legajoList });
              }
          };
      }

      indicadoresDePermanenciaController.loadLists = function () {
          indicadoresDePermanenciaController.source = [];
          $(function () {
              $("#adm_comboLegajo").autocomplete({
                  source: [indicadoresDePermanenciaController.source]
              });
          });

          // Variables para Tab-Administración
          indicadoresDePermanenciaController.adm_legajoSearchText = '';
          indicadoresDePermanenciaController.adm_legajoSelected = '';
          indicadoresDePermanenciaController.adm_nombreSelected = '';
          indicadoresDePermanenciaController.adm_apellidoSelected = '';
          indicadoresDePermanenciaController.adm_dniSelected = '';

          indicadoresDePermanenciaController.adm_sedeSelected = '';
          indicadoresDePermanenciaController.adm_carreraSelected = '';
          indicadoresDePermanenciaController.adm_kpiSelected = '';
          indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected = '';

          indicadoresDePermanenciaController.adm_chartGridData = [];

          // Variables para Tab-Académico
          indicadoresDePermanenciaController.aca_legajoSearchText = '';
          indicadoresDePermanenciaController.aca_legajoSelected = '';
          indicadoresDePermanenciaController.aca_nombreSelected = '';
          indicadoresDePermanenciaController.aca_apellidoSelected = '';
          indicadoresDePermanenciaController.aca_dniSelected = '';

          indicadoresDePermanenciaController.aca_cicloSelected = '';
          indicadoresDePermanenciaController.aca_cuatrimestreSelected = '';
          indicadoresDePermanenciaController.aca_sedeSelected = '';
          indicadoresDePermanenciaController.aca_planSelected = '';
          indicadoresDePermanenciaController.aca_kpiSelected = '';
          indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected = '';

          indicadoresDePermanenciaController.aca_chartGridData = [];

          // Variables generales
          indicadoresDePermanenciaController.legajoList = [];
          indicadoresDePermanenciaController.cicloList = [];
          indicadoresDePermanenciaController.cuatrimestreList = [1, 2];
          indicadoresDePermanenciaController.sedeList = [];
          indicadoresDePermanenciaController.planList = [];
          indicadoresDePermanenciaController.kpiList = ['', 'Inasistencias', 'Exámenes reprobados', 'Finales reprobó'];
          indicadoresDePermanenciaController.nivelDeRiesgoList = ['', 'Alto', 'Medio', 'Bajo'];

          indicadoresDePermanenciaController.chartTotalData = [];

          utilityService.callHttp({ method: "GET", url: "/api/UniPlan/GetAll", callbackSuccess: indicadoresDePermanenciaController.getPlanListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback });
          utilityService.callHttp({ method: "GET", url: "/api/UniRegional/GetAll", callbackSuccess: indicadoresDePermanenciaController.getRegionalListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback });

      };

      indicadoresDePermanenciaController.loadPersonMethods = function () {

          indicadoresDePermanenciaController.adm_legajoSelected = null;
          indicadoresDePermanenciaController.aca_legajoSelected = null;

          indicadoresDePermanenciaController.legajoList = [];

          indicadoresDePermanenciaController.legajoWasSelected = function (select) {

              if (currentTabPrefix == 'aca') {
                  indicadoresDePermanenciaController.aca_legajoSelected = select.originalObject;

                  indicadoresDePermanenciaController.aca_nombreSelected = select.originalObject.nombre;
                  indicadoresDePermanenciaController.aca_apellidoSelected = select.originalObject.apellido;
                  indicadoresDePermanenciaController.aca_dniSelected = select.originalObject.dni;
              }
              if (currentTabPrefix == 'adm') {
                  indicadoresDePermanenciaController.adm_legajoSelected = select.originalObject;

                  indicadoresDePermanenciaController.adm_nombreSelected = select.originalObject.nombre;
                  indicadoresDePermanenciaController.adm_apellidoSelected = select.originalObject.apellido;
                  indicadoresDePermanenciaController.adm_dniSelected = select.originalObject.dni;
              }

          };

          indicadoresDePermanenciaController.legajoSearch = function (str) {
              var matches = [];
              for (i in indicadoresDePermanenciaController.legajoList) {
                  var actualLegajo = indicadoresDePermanenciaController.legajoList[i];

                  if ((actualLegajo.legajoDefinitivo && actualLegajo.legajoDefinitivo.toString().indexOf(str.toString()) >= 0) ||
                      (actualLegajo.legajoProvisorio && actualLegajo.legajoProvisorio.toString().indexOf(str.toString()) >= 0)) {

                      matches.push(actualLegajo);

                      if (matches.length == 10) {
                          break;
                      }
                  }
              };
              return matches;
          };

          indicadoresDePermanenciaController.legajoInputChanged = function () {
              debugger;
              if (indicadoresDePermanenciaController.aca_legajoSearchText.length >= 4) {
                  indicadoresDePermanenciaController.legajoList = [];
                  utilityService.callHttp({ method: "GET", url: "/api/UniAlumno/GetByLegajoMatch?legajo=" + indicadoresDePermanenciaController.aca_legajoSearchText, callbackSuccess: indicadoresDePermanenciaController.getLegajoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback });
              }
          };

      };

      indicadoresDePermanenciaController.loadAdministracionGrid = function () {

          indicadoresDePermanenciaController.administracionResultList = [];

          utilityService.callHttp({
              method: "GET", url: "/api/UniAlumno/GetKPIMorosos?legajo" + indicadoresDePermanenciaController.adm_legajoSelected +
                                                                "&sede" + indicadoresDePermanenciaController.adm_sedeSelected +
                                                                "&carrera=3002" + indicadoresDePermanenciaController.adm_planSelected +
                                                                "&nombre" + indicadoresDePermanenciaController.adm_nombreSelected +
                                                                "&apellido" + indicadoresDePermanenciaController.adm_apellidoSelected +
                                                                "&dni" + indicadoresDePermanenciaController.adm_dniSelected +
                                                                "&kpi_monto_mayor=10000" +
                                                                "&kpi_monto_menor" +
                                                                "&minimoDiasDeuda=90" +
                                                                "&minimoDiasPago=0"
                                                                , callbackSuccess: indicadoresDePermanenciaController.getKPIMorosoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
          });
      };


      indicadoresDePermanenciaController.loadAcademicoGrid = function () {

          indicadoresDePermanenciaController.academicoResultList = [];

          utilityService.callHttp({
              method: "GET", url: "/api/UniAlumno/GetKPIInasistencias?ciclo=" + indicadoresDePermanenciaController.aca_cicloSelected +
                                                                "&cuatri=" + indicadoresDePermanenciaController.aca_cuatrimestreSelected +
                                                                "&legajo=" + indicadoresDePermanenciaController.aca_legajoSelected +
                                                                "&sede=" + indicadoresDePermanenciaController.aca_sedeSelected +
                                                                "&carrera=" + indicadoresDePermanenciaController.aca_planSelected +
                                                                "&nombre=" + indicadoresDePermanenciaController.aca_nombreSelected +
                                                                "&apellido=" + indicadoresDePermanenciaController.aca_apellidoSelected +
                                                                "&dni=" + indicadoresDePermanenciaController.aca_dniSelected +
                                                                "&kpiInasistenciaMayor=" +
                                                                "&kpiInasistenciaMenor="
                                                                , callbackSuccess: indicadoresDePermanenciaController.getKPIInasistenciaListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
          });
      };

      indicadoresDePermanenciaController.loadGrids = function () {

          indicadoresDePermanenciaController.resultList = [];

          // Administración table
          $('#administracionTable').bootstrapTable({ data: indicadoresDePermanenciaController.administracionResultList });

          // Académico table
          $('#academicoTable').bootstrapTable({
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
                      data: row.nested
                  });

              }
          });
      };

      indicadoresDePermanenciaController.loadCharts = function (charData) {

          // Grid data chart
          indicadoresDePermanenciaController.gridDataChart = new FusionCharts({
              type: 'pie3d',
              renderAt: 'gridChartContainer',
              dataFormat: 'json',
              height: '500',
              width: '750',
              dataSource: {
                  "chart": {
                      "showBorder": "0",
                      "use3DLighting": "0",
                      "showShadow": "0",
                      "enableSmartLabels": "0",
                      "startingAngle": "0",
                      "showPercentValues": "1",
                      "showPercentInTooltip": "0",
                      "decimals": "1",
                      "captionFontSize": "14",
                      "subcaptionFontSize": "14",
                      "subcaptionFontBold": "0",
                      "toolTipColor": "#ffffff",
                      "toolTipBorderThickness": "0",
                      "toolTipBgColor": "#000000",
                      "toolTipBgAlpha": "80",
                      "toolTipBorderRadius": "2",
                      "toolTipPadding": "5",
                      "showHoverEffect": "1",
                      "showLegend": "1",
                      "legendBgColor": "#ffffff",
                      "legendBorderAlpha": '0',
                      "legendShadow": '0',
                      "legendItemFontSize": '10',
                      "legendItemFontColor": '#666666'
                  },
                  "data": charData
              }
          });

          indicadoresDePermanenciaController.gridDataChart.render();

      };

  });