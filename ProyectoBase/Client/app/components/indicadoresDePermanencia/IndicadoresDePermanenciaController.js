﻿angular.module('app')
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
                  var actualLegajo, previousLegajo, nuevaInasistencia = null, nuevaInasistenciaCreada = false;

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
                          }
                          if (actualKPIInasistencia.Promedio > $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR && actualKPIInasistencia.Promedio < $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR) {
                              inasistenciaTexto = 'MEDIO';
                          }
                          if (actualKPIInasistencia.Promedio <= $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR) {
                              inasistenciaTexto = 'BAJO';
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
                      
                      if (response.data[index + 1] && response.data[index + 1].Legajo != actualLegajo) {
                          indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                          previousLegajo = actualLegajo;
                          nuevaInasistencia = null;
                          nuevaInasistenciaCreada = false;

                      }
                      if (!response.data[index + 1]) {
                          indicadoresDePermanenciaController.academicoResultList.push(nuevaInasistencia);
                      }
                  }
                  $('#academicoTable').bootstrapTable('load', indicadoresDePermanenciaController.academicoResultList);
              }
          };

          indicadoresDePermanenciaController.getLegajoListCallback = function (response) {
              if (response) {
                  for (i in response.data) {
                      var actualLegajo = response.data[i];
                      indicadoresDePermanenciaController.legajoList.push(
                                {
                                    legajoDefinitivo: actualLegajo.LegajoDefinitivo,
                                    legajoProvisorio: actualLegajo.LegajoProvisorio,
                                    nombre: actualLegajo.Nombre,
                                    apellido: actualLegajo.Apellido,
                                    dni: actualLegajo.DNI
                                });
                  }
              }
          };
      }

      indicadoresDePermanenciaController.updateLegajo = function () {

          indicadoresDePermanenciaController.newSource = ['HOLA', 'CHAU'];
          $(function () {
              $("#adm_comboLegajo").autocomplete({ source: indicadoresDePermanenciaController.newSource });
          });
      };

      indicadoresDePermanenciaController.loadLists = function () {
          indicadoresDePermanenciaController.source = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California'];
          $(function () {
              $("#adm_comboLegajo").autocomplete({
                  source: [indicadoresDePermanenciaController.source]
              });
          });

          // Variables para Tab-Administración
          indicadoresDePermanenciaController.adm_legajoSelected = null;
          indicadoresDePermanenciaController.adm_nombreSelected = null;
          indicadoresDePermanenciaController.adm_apellidoSelected = null;
          indicadoresDePermanenciaController.adm_dniSelected = null;

          indicadoresDePermanenciaController.adm_cicloSelected = null;
          indicadoresDePermanenciaController.adm_cuatrimestreSelected = null;
          indicadoresDePermanenciaController.adm_sedeSelected = null;
          indicadoresDePermanenciaController.adm_carreraSelected = null;
          indicadoresDePermanenciaController.adm_kpiSelected = null;
          indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected = null;

          // Variables para Tab-Académico
          indicadoresDePermanenciaController.aca_legajoSelected = null;
          indicadoresDePermanenciaController.aca_nombreSelected = null;
          indicadoresDePermanenciaController.aca_apellidoSelected = null;
          indicadoresDePermanenciaController.aca_dniSelected = null;

          indicadoresDePermanenciaController.aca_cicloSelected = null;
          indicadoresDePermanenciaController.aca_cuatrimestreSelected = null;
          indicadoresDePermanenciaController.aca_sedeSelected = null;
          indicadoresDePermanenciaController.aca_planSelected = null;
          indicadoresDePermanenciaController.aca_kpiSelected = null;
          indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected = null;

          // Variables generales
          indicadoresDePermanenciaController.adm_legajoSearchText = '';
          indicadoresDePermanenciaController.aca_legajoSearchText = '';
          indicadoresDePermanenciaController.legajoList = [];
          indicadoresDePermanenciaController.cicloList = [];
          indicadoresDePermanenciaController.cuatrimestreList = [1, 2];
          indicadoresDePermanenciaController.sedeList = [];
          indicadoresDePermanenciaController.planList = [];
          indicadoresDePermanenciaController.kpiList = [];
          indicadoresDePermanenciaController.nivelDeRiesgoList = [];

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

          indicadoresDePermanenciaController.legajoInputChanged = function (str) {
              if (str.length >= 4) {
                  indicadoresDePermanenciaController.legajoList = [];


                  utilityService.callHttp({ method: "GET", url: "/api/UniAlumno/GetByLegajoMatch?legajo=" + str, callbackSuccess: indicadoresDePermanenciaController.getLegajoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback });
              }
          };

      };

      indicadoresDePermanenciaController.loadAdministracionGrid = function () {

          indicadoresDePermanenciaController.administracionResultList = [];

          //utilityService.callHttp({
          //    method: "GET", url: "/api/UniAlumno/GetKPIMorosos?legajo=" + indicadoresDePermanenciaController.adm_legajoSelected +
          //                                                      "&sede=" + indicadoresDePermanenciaController.adm_sedeSelected +
          //                                                      "&carrera=" + indicadoresDePermanenciaController.adm_planSelected +
          //                                                      "&nombre=" + indicadoresDePermanenciaController.adm_nombreSelected +
          //                                                      "&apellido=" +indicadoresDePermanenciaController.adm_apellidoSelected +
          //                                                      "&dni=" + indicadoresDePermanenciaController.adm_dniSelected +
          //                                                      "&kpi_monto_mayor=" + indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected
          //                                                      ,callbackSuccess: getLegajoListCallback, callbackError: getErrorCallback
          //});


          utilityService.callHttp({
              method: "GET", url: "/api/UniAlumno/GetKPIMorosos?legajo" +
                                                                "&sede" +
                                                                "&carrera=3002" +
                                                                "&nombre" +
                                                                "&apellido" +
                                                                "&dni" +
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
              method: "GET", url: "/api/UniAlumno/GetKPIInasistencias?ciclo=2017&cuatri=1&legajo&sede&carrera=1703&nombre&apellido&dni&kpiInasistenciaMayor&kpiInasistenciaMenor"
                                                                , callbackSuccess: indicadoresDePermanenciaController.getKPIInasistenciaListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
          });
      };

      indicadoresDePermanenciaController.loadGrids = function () {

          indicadoresDePermanenciaController.resultList = [];

          $('#administracionTable').bootstrapTable({ data: indicadoresDePermanenciaController.administracionResultList });

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
  });