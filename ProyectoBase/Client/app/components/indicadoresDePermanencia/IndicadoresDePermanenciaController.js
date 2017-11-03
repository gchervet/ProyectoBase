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

          indicadoresDePermanenciaController.getFullGridInfoListCallback = function (response) {
              debugger;
              if (response) {
                  indicadoresDePermanenciaController.aca_lastCicloCuatriSelected = { ciclo: indicadoresDePermanenciaController.aca_cicloSelected, cuatrimestre: indicadoresDePermanenciaController.aca_cuatrimestreSelected };
                  indicadoresDePermanenciaController.loadChartInfo(response.data, 'aca_fullChartContainer', 'Total de inasistencias', 'En el ciclo ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.ciclo + ', cuatrimestre ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.cuatrimestre, $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR, $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR, '#F9670C,#FFB089,#F9CCB6');

                  utilityService.callHttp({
                      method: "GET", url: "/api/UniAlumno/GetExamenesReprobadosTotal?ciclo=" + indicadoresDePermanenciaController.aca_cicloSelected + "&cuatri=" + indicadoresDePermanenciaController.aca_cuatrimestreSelected
                                                           , callbackSuccess: indicadoresDePermanenciaController.getExamenesReprobadosTotalInfoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
                  });
              }
          };

          indicadoresDePermanenciaController.getExamenesReprobadosTotalInfoListCallback = function (response) {
              debugger;
              if (response) {
                  indicadoresDePermanenciaController.aca_lastCicloCuatriSelected = { ciclo: indicadoresDePermanenciaController.aca_cicloSelected, cuatrimestre: indicadoresDePermanenciaController.aca_cuatrimestreSelected };
                  indicadoresDePermanenciaController.loadChartInfo(response.data, 'aca_fullExamenesReprobadosChartContainer', 'Total de exámenes reprobados', 'En el ciclo ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.ciclo + ', cuatrimestre ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.cuatrimestre, $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR, $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR, '#3288D3,#639FD3,#A3CAED');

                  utilityService.callHttp({
                      method: "GET", url: "/api/UniAlumno/GetFinalesReprobadosTotal?ciclo=" + indicadoresDePermanenciaController.aca_cicloSelected + "&cuatri=" + indicadoresDePermanenciaController.aca_cuatrimestreSelected
                                                           , callbackSuccess: indicadoresDePermanenciaController.getFinalesReprobadosTotalInfoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
                  });
              }
          };

          indicadoresDePermanenciaController.getFinalesReprobadosTotalInfoListCallback = function (response) {
              debugger;
              if (response) {
                  indicadoresDePermanenciaController.aca_lastCicloCuatriSelected = { ciclo: indicadoresDePermanenciaController.aca_cicloSelected, cuatrimestre: indicadoresDePermanenciaController.aca_cuatrimestreSelected };
                  indicadoresDePermanenciaController.loadChartInfo(response.data, 'aca_fullFinalesReprobadosChartContainer', 'Total de finales reprobados', 'En el ciclo ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.ciclo + ', cuatrimestre ' + indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.cuatrimestre, $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR, $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR, '#42A540,#25E222,#A4FFA3');
              }
          };

          // Método de Chart genérico
          indicadoresDePermanenciaController.loadChartInfo = function (data, gridName, charTitle, charSubtitle, lowerLimit, higherLimit, charColour) {

              var cantALTO = 0, cantMEDIO = 0, cantBAJO = 0;
              if (data) {
                  for (i in data) {

                      if (data[i] >= higherLimit) { cantALTO++; }
                      if (data[i] > lowerLimit && data[i] < higherLimit) { cantMEDIO++; }
                      if (data[i] <= lowerLimit) { cantBAJO++; }
                  }
                  indicadoresDePermanenciaController.loadCharts(gridName, [{ 'label': 'ALTO', 'value': cantALTO.toString() }, { 'label': 'MEDIO', 'value': cantMEDIO.toString() }, { 'label': 'BAJO', 'value': cantBAJO.toString() }], charTitle, charSubtitle, charColour);
              }
          };

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

		  indicadoresDePermanenciaController.clearCharts = function(tabPrefix){
		  
			var chart;
		    
			if(tabPrefix == 'adm'){
				 indicadoresDePermanenciaController.loadCharts('adm_morososGridChartContainer', [], 'Morosos encontrados', 'Según los filtros ingresados', '#F9670C,#FFB089,#F9CCB6');
			}
			if(tabPrefix == 'aca'){
				
				indicadoresDePermanenciaController.loadCharts('aca_gridChartContainer', [], 'Inasistencias encontradas', 'Según los filtros ingresados', '#F9670C,#FFB089,#F9CCB6');
                indicadoresDePermanenciaController.loadCharts('aca_examenesReprobadosChartContainer', [], 'Exámenes reprobados', 'Según los filtros ingresados', '#3288D3,#639FD3,#A3CAED');
                indicadoresDePermanenciaController.loadCharts('aca_finalesReprobadosChartContainer', [], 'Finales reprobados', 'Según los filtros ingresados', '#42A540,#25E222,#A4FFA3');

			}
			
			chart = null;
		  };
		  
          // KPI Morosos
          indicadoresDePermanenciaController.getKPIMorosoListCallback = function (response) {
			  
			  if(indicadoresDePermanenciaController.adm_resetCharts){ indicadoresDePermanenciaController.clearCharts('adm'); }
              if (response) {
                  for (i in response.data) {
                        
                      var actualKPIMoroso = response.data[i],
                          valorDeDeuda = '',
                          cantALTO = 0,
                          cantMEDIO = 0,
                          cantBAJO = 0;

                      if (actualKPIMoroso.DeudaToal >= $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR) {
                          valorDeDeuda = 'ALTO';
                          cantALTO++;
                      }
                      if ($rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR < actualKPIMoroso.DeudaToal && actualKPIMoroso.DeudaToal < $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR) {
                          valorDeDeuda = 'MEDIO';
                          cantMEDIO++;
                      }
                      if (actualKPIMoroso.DeudaToal <= $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR) {
                          valorDeDeuda = 'BAJO';
                          cantBAJO++;
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

                  // Load charts values
                  indicadoresDePermanenciaController.loadCharts('adm_morososGridChartContainer', [{ 'label': 'ALTO', 'value': cantALTO.toString() }, { 'label': 'MEDIO', 'value': cantMEDIO.toString() }, { 'label': 'BAJO', 'value': cantBAJO.toString() }], 'Morosos encontradas', 'Según los filtros ingresados', '#F9670C,#FFB089,#F9CCB6');

                  if (!indicadoresDePermanenciaController.adm_lastCicloCuatriSelected ||
                      indicadoresDePermanenciaController.adm_lastCicloCuatriSelected.ciclo != indicadoresDePermanenciaController.adm_cicloSelected ||
                      indicadoresDePermanenciaController.adm_lastCicloCuatriSelected.cuatrimestre != indicadoresDePermanenciaController.adm_cuatrimestreSelected) {

                      utilityService.callHttp({
                          method: "GET", url: "/api/UniAlumno/GetMorososTotal?ciclo=" + indicadoresDePermanenciaController.adm_cicloSelected + "&cuatri=" + indicadoresDePermanenciaController.adm_cuatrimestreSelected
                                                               , callbackSuccess: indicadoresDePermanenciaController.getMorososTotalGridInfoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
                      });
                  }

				  indicadoresDePermanenciaController.adm_resetCharts = true;
              }
          };

          indicadoresDePermanenciaController.getMorososTotalGridInfoListCallback = function (response) {

              if (response) {
                  indicadoresDePermanenciaController.adm_lastCicloCuatriSelected = { ciclo: indicadoresDePermanenciaController.adm_cicloSelected, cuatrimestre: indicadoresDePermanenciaController.adm_cuatrimestreSelected };
                  indicadoresDePermanenciaController.loadChartInfo(response.data, 'adm_morososFullChartContainer', 'Total de morosos', 'En el ciclo ' + indicadoresDePermanenciaController.adm_lastCicloCuatriSelected.ciclo + ', cuatrimestre ' + indicadoresDePermanenciaController.adm_lastCicloCuatriSelected.cuatrimestre, $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR, $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR, '#F9670C,#FFB089,#F9CCB6');
              }
          };

          // KPI Inasistencias
          indicadoresDePermanenciaController.getKPIInasistenciaListCallback = function (response) {
              
			  if(indicadoresDePermanenciaController.aca_resetCharts) {indicadoresDePermanenciaController.clearCharts('aca');}
              if (response) {
				  
                  debugger;

                  indicadoresDePermanenciaController.academicoResultList = [];

                  var actualLegajo,
                      previousLegajo,
                      nuevaInasistencia = null,
                      nuevaInasistenciaCreada = false,
                      cantALTO = 0,
                      cantMEDIO = 0,
                      cantBAJO = 0,
                      cantExamenesReprobadosALTO = 0,
                      cantExamenesReprobadosMEDIO = 0,
                      cantExamenesReprobadosBAJO = 0,
                      cantFinalesReprobadosALTO = 0,
                      cantFinalesReprobadosMEDIO = 0,
                      cantFinalesReprobadosBAJO = 0;

                  for (i in response.data) {
                      var index = Number(i);
                      var actualKPIInasistencia = response.data[index];

                      actualLegajo = actualKPIInasistencia.Legajo;

                      nuevaMateria = {
                          Inasistencia: actualKPIInasistencia.Inansistencia,
                          Materia: actualKPIInasistencia.Materia,
                          Examenes: actualKPIInasistencia.ExamenesDesaprobados,
                          FinalesReprobados: actualKPIInasistencia.FinalesDesaprobados
                      };

                      if (((previousLegajo && actualLegajo != previousLegajo) || (!nuevaInasistencia)) && !nuevaInasistenciaCreada) {
                          
                          // Inasistencia - Resumen
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

                          // Exámenes reprobados - Resumen
                          var examenesReprobadosTexto = '';
                          if (actualKPIInasistencia.PromedioExamenesReprobados >= $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR) {
                              examenesReprobadosTexto = 'ALTO';
                              cantExamenesReprobadosALTO++;
                          }
                          if (actualKPIInasistencia.PromedioExamenesReprobados > $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR && actualKPIInasistencia.PromedioExamenesReprobados < $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR) {
                              examenesReprobadosTexto = 'MEDIO';
                              cantExamenesReprobadosMEDIO++;
                          }
                          if (actualKPIInasistencia.PromedioExamenesReprobados <= $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR) {
                              examenesReprobadosTexto = 'BAJO';
                              cantExamenesReprobadosBAJO++;
                          }

                          // Finales reprobados - Resumen
                          var finalesReprobadosTexto = '';
                          if (actualKPIInasistencia.PromedioFinalesReprobados >= $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR) {
                              finalesReprobadosTexto = 'ALTO';
                              cantFinalesReprobadosALTO++;
                          }
                          if (actualKPIInasistencia.PromedioFinalesReprobados > $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR && actualKPIInasistencia.PromedioFinalesReprobados < $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR) {
                              finalesReprobadosTexto = 'MEDIO';
                              cantFinalesReprobadosMEDIO++;
                          }
                          if (actualKPIInasistencia.PromedioFinalesReprobados <= $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR) {
                              finalesReprobadosTexto = 'BAJO';
                              cantFinalesReprobadosBAJO++;
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
                              Examenes: examenesReprobadosTexto,
                              FinalesReprobados: finalesReprobadosTexto,


                              nested: []
                          }
                          nuevaInasistenciaCreada = true;
                      }
                      nuevaInasistencia.nested.push(nuevaMateria);

                      if ((response.data[index + 1] && response.data[index + 1].Legajo != actualLegajo) || !response.data[index + 1]) {

                          // Si no hay filtro KPI
                          if (!indicadoresDePermanenciaController.aca_kpiSelected) {
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

                  // Load grid values
                  $('#academicoTable').bootstrapTable('load', indicadoresDePermanenciaController.academicoResultList);

                  // Load charts values
                  indicadoresDePermanenciaController.loadCharts('aca_gridChartContainer', [{ 'label': 'ALTO', 'value': cantALTO.toString() }, { 'label': 'MEDIO', 'value': cantMEDIO.toString() }, { 'label': 'BAJO', 'value': cantBAJO.toString() }], 'Inasistencias encontradas', 'Según los filtros ingresados', '#F9670C,#FFB089,#F9CCB6');
                  indicadoresDePermanenciaController.loadCharts('aca_examenesReprobadosChartContainer', [{ 'label': 'ALTO', 'value': cantExamenesReprobadosALTO.toString() }, { 'label': 'MEDIO', 'value': cantExamenesReprobadosMEDIO.toString() }, { 'label': 'BAJO', 'value': cantExamenesReprobadosBAJO.toString() }], 'Exámenes reprobados', 'Según los filtros ingresados', '#3288D3,#639FD3,#A3CAED');
                  indicadoresDePermanenciaController.loadCharts('aca_finalesReprobadosChartContainer', [{ 'label': 'ALTO', 'value': cantFinalesReprobadosALTO.toString() }, { 'label': 'MEDIO', 'value': cantFinalesReprobadosMEDIO.toString() }, { 'label': 'BAJO', 'value': cantFinalesReprobadosBAJO.toString() }], 'Finales reprobados', 'Según los filtros ingresados', '#42A540,#25E222,#A4FFA3');


                  if (!indicadoresDePermanenciaController.aca_lastCicloCuatriSelected ||
                      indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.ciclo != indicadoresDePermanenciaController.aca_cicloSelected ||
                      indicadoresDePermanenciaController.aca_lastCicloCuatriSelected.cuatrimestre != indicadoresDePermanenciaController.aca_cuatrimestreSelected) {

                      utilityService.callHttp({
                          method: "GET", url: "/api/UniAlumno/GetKPIInasistenciasTotalPromedios?ciclo=" + indicadoresDePermanenciaController.aca_cicloSelected + "&cuatri=" + indicadoresDePermanenciaController.aca_cuatrimestreSelected
                                                               , callbackSuccess: indicadoresDePermanenciaController.getFullGridInfoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
                      });
                  }
				  indicadoresDePermanenciaController.aca_resetCharts = true;
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
          indicadoresDePermanenciaController.adm_planSelected = '';
          indicadoresDePermanenciaController.adm_kpiSelected = '';
          indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected = '';

          indicadoresDePermanenciaController.adm_chartGridData = [];
          indicadoresDePermanenciaController.adm_lastCicloCuatriSelected = {};
		  
		  indicadoresDePermanenciaController.adm_resetCharts = false;

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
          indicadoresDePermanenciaController.aca_lastCicloCuatriSelected = {};
		  
		  indicadoresDePermanenciaController.aca_resetCharts = false;

          // Variables generales
          indicadoresDePermanenciaController.legajoList = [];
          indicadoresDePermanenciaController.cicloList = [];
          indicadoresDePermanenciaController.cuatrimestreList = [1, 2];
          indicadoresDePermanenciaController.sedeList = [];
          indicadoresDePermanenciaController.planList = [];
          indicadoresDePermanenciaController.kpiList = ['Inasistencias', 'Exámenes reprobados', 'Finales reprobó'];
          indicadoresDePermanenciaController.adm_kpiList = ['Monto de deuda'];
          indicadoresDePermanenciaController.nivelDeRiesgoList = ['Alto', 'Medio', 'Bajo'];

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
              /*
              
              if (indicadoresDePermanenciaController.aca_legajoSearchText.length >= 4) {
                  indicadoresDePermanenciaController.legajoList = [];
                  utilityService.callHttp({ method: "GET", url: "/api/UniAlumno/GetByLegajoMatch?legajo=" + indicadoresDePermanenciaController.aca_legajoSearchText, callbackSuccess: indicadoresDePermanenciaController.getLegajoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback });
              }
              */
          };

      };

      indicadoresDePermanenciaController.loadAdministracionGrid = function () {

          indicadoresDePermanenciaController.administracionResultList = [];

          var kpi_monto_url_query = '&kpi_monto_menor=&kpi_monto_mayor=';

          if (indicadoresDePermanenciaController.adm_kpiSelected) {
              if (indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected == 'Alto') {
                  kpi_monto_url_query = '&kpi_monto_menor&kpi_monto_mayor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR;
              }
              if (indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected == 'Medio') {
                  kpi_monto_url_query = '&kpi_monto_menor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR + '&kpi_monto_mayor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR;
              }
              if (indicadoresDePermanenciaController.adm_nivelDeRiesgoSelected == 'Bajo') {
                  kpi_monto_url_query = '&kpi_monto_mayor=&kpi_monto_menor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR;
              }
          }
          //else {
          //    kpi_monto_url_query = '&kpi_monto_menor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR + '&kpi_monto_mayor=' + $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR;
          //}

          utilityService.callHttp({
              method: "GET", url: "/api/UniAlumno/GetKPIMorosos?ciclo=" + indicadoresDePermanenciaController.adm_cicloSelected +
                                                                "&cuatri=" + indicadoresDePermanenciaController.adm_cuatrimestreSelected +
                                                                "&legajo=" + (indicadoresDePermanenciaController.adm_legajoSearchText ? indicadoresDePermanenciaController.adm_legajoSearchText : '') +
                                                                "&sede=" + (indicadoresDePermanenciaController.adm_sedeSelected ? indicadoresDePermanenciaController.adm_sedeSelected : '') +
                                                                "&carrera=" + (indicadoresDePermanenciaController.adm_planSelected ? indicadoresDePermanenciaController.adm_planSelected : '') +
                                                                "&nombre=" + (indicadoresDePermanenciaController.adm_nombreSelected ? indicadoresDePermanenciaController.adm_nombreSelected : '') +
                                                                "&apellido=" + (indicadoresDePermanenciaController.adm_apellidoSelected ? indicadoresDePermanenciaController.adm_apellidoSelected : '') +
                                                                "&dni=" + indicadoresDePermanenciaController.adm_dniSelected +
                                                                kpi_monto_url_query 
                                                                , callbackSuccess: indicadoresDePermanenciaController.getKPIMorosoListCallback, callbackError: indicadoresDePermanenciaController.getErrorCallback
          });
      };
      
      indicadoresDePermanenciaController.loadAcademicoGrid = function () {

          indicadoresDePermanenciaController.academicoResultList = [];

          // KPI Inasistencia Filter
          var kpi_inasistencia_url_query = '&kpi_inasistencia_mayor=&kpi_inasistencia_menor=';

          if (indicadoresDePermanenciaController.aca_kpiSelected == 'Inasistencias') {
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Alto') {
                  kpi_inasistencia_url_query = '&kpi_inasistencia_menor&kpi_inasistencia_mayor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Medio') {
                  kpi_inasistencia_url_query = '&kpi_inasistencia_menor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR + '&kpi_inasistencia_mayor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Bajo') {
                  kpi_inasistencia_url_query = '&kpi_inasistencia_mayor=&kpi_inasistencia_menor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR;
              }
          }
          //else {
          //    kpi_inasistencia_url_query = '&kpi_inasistencia_menor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR + '&kpi_inasistencia_mayor=' + $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR;
          //}

          // KPI Exámenes reprobados Filter
          var kpi_examenes_url_query = '&kpi_reprobados_mayor=&kpi_reprobados_menor=';

          if (indicadoresDePermanenciaController.aca_kpiSelected == 'Exámenes reprobados') {
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Alto') {
                  kpi_examenes_url_query = '&kpi_reprobados_menor&kpi_reprobados_mayor=' + $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Medio') {
                  kpi_examenes_url_query = '&kpi_reprobados_menor=' +$rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR + '&kpi_reprobados_mayor=' + $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Bajo') {
                  kpi_examenes_url_query = '&kpi_reprobados_mayor=&kpi_reprobados_menor=' + $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
              }
          }
          //else {
          //    kpi_examenes_url_query = '&kpi_reprobados_menor=' + $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR + '&kpi_reprobados_mayor=' + $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
          //}

          // KPI Finales reprobados Filter
          var kpi_finales_url_query = '&kpi_finales_mayor=&kpi_finales_menor=';

          if (indicadoresDePermanenciaController.aca_kpiSelected == 'Finales reprobó') {
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Alto') {
                  kpi_finales_url_query = '&kpi_finales_menor&kpi_finales_mayor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Medio') {
                  kpi_finales_url_query = '&kpi_finales_menor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR + '&kpi_finales_mayor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
              }
              if (indicadoresDePermanenciaController.aca_nivelDeRiesgoSelected == 'Bajo') {
                  kpi_finales_url_query = '&kpi_finales_mayor=&kpi_finales_menor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
              }
          }
          //else {
          //    kpi_finales_url_query = '&kpi_finales_menor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR + '&kpi_finales_mayor=' + $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR;
          //}

          utilityService.callHttp({
              method: "GET", url: "/api/UniAlumno/GetKPIInasistencias?ciclo=" + indicadoresDePermanenciaController.aca_cicloSelected +
                                                                "&cuatri=" + indicadoresDePermanenciaController.aca_cuatrimestreSelected +
                                                                "&legajo=" + (indicadoresDePermanenciaController.aca_legajoSearchText ? indicadoresDePermanenciaController.aca_legajoSearchText : '') +
                                                                "&sede=" + (indicadoresDePermanenciaController.aca_sedeSelected ? indicadoresDePermanenciaController.aca_sedeSelected : '') +
                                                                "&carrera=" + (indicadoresDePermanenciaController.aca_planSelected ? indicadoresDePermanenciaController.aca_planSelected : '') +
                                                                "&nombre=" + (indicadoresDePermanenciaController.aca_nombreSelected ? indicadoresDePermanenciaController.aca_nombreSelected : '') +
                                                                "&apellido=" + (indicadoresDePermanenciaController.aca_apellidoSelected ? indicadoresDePermanenciaController.aca_apellidoSelected : '') +
                                                                "&dni=" + (indicadoresDePermanenciaController.aca_dniSelected ? indicadoresDePermanenciaController.aca_dniSelected : '') +
                                                                kpi_inasistencia_url_query +
                                                                kpi_examenes_url_query +
                                                                kpi_finales_url_query
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

      indicadoresDePermanenciaController.loadCharts = function (charId, charData, title, subtitle, colours) {

          // Previous validations
          if (!colours) { colours = '#008ee4,#e6e600,#00e600'; }
          if (!subtitle) { subtitle = ''; }

          // Grid data chart
          indicadoresDePermanenciaController.gridDataChart = new FusionCharts({
              type: 'pie3d',
              renderAt: charId,
              dataFormat: 'json',
              height: '500',
              width: '750',
              dataSource: {
                  "chart": {
                      "showBorder": "0",
                      "caption": title,
                      "subCaption": subtitle,
                      "use3DLighting": "0",
                      "showShadow": "0",
                      "enableSmartLabels": "0",
                      "startingAngle": "0",
                      "showPercentValues": "1",
                      "showPercentInTooltip": "0",
                      "decimals": "1",
                      "palettecolors": colours,
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