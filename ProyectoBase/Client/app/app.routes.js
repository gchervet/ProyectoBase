/// <reference path="components/indicadoresDePermanencia/indicadoresDePermanencia.html" />
/// <reference path="components/indicadoresDePermanencia/indicadoresDePermanencia.html" />
app.config(['$qProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',
    function ($qProvider, $routeProvider, $stateProvider, $urlRouterProvider) {

        $qProvider.errorOnUnhandledRejections(false);

        $routeProvider
          .when('/login', {
              templateUrl: '/app/components/login/login.html',
              controller: 'loginController as vm'
          })
          .when('/home', {
              templateUrl: '/app/components/home/home.html',
              controller: 'homeController as home',
              requiresAuthentication: true
          })
          .when('/main', {
              templateUrl: '/app/components/main/main.html',
              controller: 'mainController as main',
              requiresAuthentication: true
          })
          .when('/user', {
              templateUrl: '/app/components/user/userProfile.html',
              controller: 'userProfileController as vm',
              requiresAuthentication: true
          })
          /* INGRESOS */
          .when('/MatriculacionYArancelamiento', {
              templateUrl: '/app/components/inscripciones/matriculacionYArancelamiento.html',
              controller: 'matriculacionYArancelamientoController as vm',
              requiresAuthentication: true
          })
          .when('/ConsultaDeMatriculaciones', {
              templateUrl: '/app/components/inscripciones/consultaDeMatriculaciones.html',
              controller: 'consultaDeMatriculacionesController as vm',
              requiresAuthentication: true
          })
          .when('/InscripcionAMaterias', {
              templateUrl: '/app/components/inscripciones/inscripcionAMaterias.html',
              controller: 'inscripcionAMateriasController as vm',
              requiresAuthentication: true
          })
          .when('/ConsultaDeInscripcionAMaterias', {
              templateUrl: '/app/components/inscripciones/consultaDeInscripcionAMaterias.html',
              controller: 'consultaDeInscripcionAMateriasController as vm',
              requiresAuthentication: true
          })
          .when('/ConsultaDeDerechosDeExamen', {
              templateUrl: '/app/components/inscripciones/consultaDeDerechosDeExamen.html',
              controller: 'consultaDeDerechosDeExamenController as vm',
              requiresAuthentication: true
          })
          .when('/InscripcionAExamenes', {
              templateUrl: '/app/components/inscripciones/inscripcionAExamenes.html',
              controller: 'inscripcionAExamenesController as vm',
              requiresAuthentication: true
          })
          .when('/ConsultaDeInscripcionAExamenes', {
              templateUrl: '/app/components/inscripciones/consultaDeInscripcionAExamenes.html',
              controller: 'consultaDeInscripcionAExamenesController as vm',
              requiresAuthentication: true
          })
          /* PROGRAMACIÓN ACADÉMICA */
          .when('/CrearCursoAislado', {
              templateUrl: '/app/components/programacionAcademica/crearCursoAislado.html',
              controller: 'crearCursoAisladoController as vm',
              requiresAuthentication: true
          })
          .when('/CrearCursoDesdeCarrera', {
              templateUrl: '/app/components/programacionAcademica/crearCursoDesdeCarrera.html',
              controller: 'crearCursoDesdeCarreraController as vm',
              requiresAuthentication: true
          })
          .when('/CrearCursoDesdeCurso', {
              templateUrl: '/app/components/programacionAcademica/crearCursoDesdeCurso.html',
              controller: 'crearCursoDesdeCursoController as vm',
              requiresAuthentication: true
          })
          /* INDICADORES DE PERMANENCIA */
          .when('/IndicadoresDePermanencia', {
              templateUrl: '/app/components/indicadoresDePermanencia/indicadoresDePermanencia.html',
              controller: 'indicadoresDePermanenciaController as vm',
              requiresAuthentication: true
          })
          .otherwise({ redirectTo: "home" });

    }]);

app.run(['myUrl', '$rootScope', '$location', 'Auth', 'blockUIConfig',
    function (myUrl, $rootScope, $location, Auth, blockUIConfig) {

        // Setting the authorization Instance
        Auth.init();

        // Setting the authentication validation on every route change
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!Auth.checkPermissionForView(next)) {
                event.preventDefault();
                $location.path("/login");
            }
        });

        // Setting service url
        $rootScope.myUrl = myUrl;

        /* Setting global variables */
        // 4.Client\app\components\indicadoresDePermanencia\indicadoresDePermanencia.html
        $rootScope.KPI_DEUDA_LIMITE_MAYOR = 30000;
        $rootScope.KPI_DEUDA_LIMITE_MENOR = 15000;
        $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR = 10000;
        $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR = 1000;

        blockUIConfig.message = "Cargando ...";
        blockUIConfig.requestFilter = function (request) { return (request.noBlock) ? false : blockUIConfig.message; };


    }]);