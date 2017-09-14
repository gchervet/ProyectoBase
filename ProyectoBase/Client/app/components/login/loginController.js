angular.module("app")
    .controller("loginController", [
        "$scope",
        "$rootScope",
        "$location",
        "$state",
        "$uibModal",
        "myUrl",
        "$window",
        "utilityService",
        "Auth",
        function ($scope, $rootScope, $location, $state, $uibModal, myUrl, $window, utilityService, Auth) {
            
            /* PARA USAR VALIDACION DE AUTH SERVICE */
            //$scope.email = "";
            //$scope.password = "";
            //$scope.failed = false;

            //$scope.login = function () {
            //    Auth.login($scope.email, $scope.password)
            //      .then(function () {
            //          $location.path("/home");
            //      }, function () {
            //          $scope.failed = true;
            //      });
            //};


            debugger; 
            var loginController = this;
            $scope.loginUser = {};

            var idLang = $location.search().idLanguage;
            if (idLang) {
                route.idLanguage = idLang;
                StorageCacheService.removeAll();
                $translate.refresh();
            }

            loginController.init = function () {
                debugger;
                generalConfigurationCallback = function (response) {
                    loginController.enableRegister = response;
                }
                             
            };

            loginController.KeepLoggedIn = false;

            loginController.resetUserPassword = function () {
                $scope.loginUser.Password = "";
                $scope.form.$setPristine();
            };

            loginController.handleLoginResponse = function (response) {
                
                loginController.redirectAfterLogin();
            };

            loginController.redirectAfterLogin = function () {

                //Limpio el cache para que no busque las traducciones ahí y le indico que las busque nuevamente
                StorageCacheService.removeAll();
                $translate.refresh().then(function () {
                    $("body").removeClass("solidimageLogin");
                    loginController.passwordCaducity();


                    if ($location.search().path) {
                        if ($location.search().path.indexOf("redirected=true") > 0) {
                            $state.go('unauthorized');
                        }
                        else {
                            var username = $cookies.get('user');
                            var character = ($location.search().path.indexOf("?") > 0) ? "&" : "?";
                            var url = $location.search().path + character + "redirected=true";
                            $window.location.href = url;
                        }
                    }
                    else {
                        $state.go('empty').then(function () {
                            setTimeout(function () { $rootScope.refreshMenu = true; }, 0);
                        });
                    }
                });
            };

            $scope.authorizeAction = function () {
                
                var loginCallback = function (response) {
                    debugger;
                    if (response) {
                        loginController.failedLoginCode = response.FailedLoginCode;
                    }
                    loginController.handleLoginResponse(response);
                };

                var errorCallback = function (response) {
                    loginController.resetUserPassword();
                    loginController.failedLoginCode = response.code;
                }

                utilityService.callHttp({ method: "POST", url: "/api/User/Authenticate", data: $scope.loginUser, callbackSuccess: loginCallback, callbackError: errorCallback });

                return false;
            };


            loginController.register = function () {

                var modalCreate = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'medium',
                    templateUrl: 'app/components/login/loginRegister.html',
                    controller: 'loginRegisterController as vm',
                    resolve: null
                });
            };

            loginController.forgotPassword = function () {

                var modal = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'medium',
                    templateUrl: 'app/components/login/loginForgotPasswordTemplete.html',
                    controller: 'loginForgotPasswordController as vm',
                    resolve: null
                });
            };

        }]);