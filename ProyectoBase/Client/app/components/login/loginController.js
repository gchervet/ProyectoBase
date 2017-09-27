app.controller("loginController", [
        "$scope",
        '$cookies',
        "$rootScope",
        "$location",
        "$state",
        "$uibModal",
        "myUrl",
        "$window",
        "utilityService",
        "$sessionStorage",
        "Auth",
        function ($scope, $cookies, $rootScope, $location, $state, $uibModal, myUrl, $window, utilityService, $sessionStorage, Auth) {

            /* PARA USAR VALIDACION DE AUTH SERVICE */
            $scope.email = "";
            $scope.password = "";
            $scope.failed = false;

            $scope.login = function () {

            };


            var loginController = this;
            $scope.loginUser = {};

            var idLang = $location.search().idLanguage;
            if (idLang) {
                route.idLanguage = idLang;
                StorageCacheService.removeAll();
                $translate.refresh();
            }

            loginController.init = function () {

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


                //if (Auth.userHasPermission(["administration"])) {
                //    // some evil logic here
                //    var userName = Auth.currentUser().name;
                //    // ...
                //}

                loginController.redirectAfterLogin();
            };

            loginController.redirectAfterLogin = function () {

            };

            $scope.authorizeAction = function () {

                var loginCallback = function (response) {
                    if (response) {

                        loginController.failedLoginCode = response.data.FailedLoginCode;

                        if (response.data.FailedLoginCode == 1) {
                            
                            /* Seteo de fecha de expiración del token */
                            var now = new Date(),
                                expirationMinutes = 10;

                            if (response.data.expirationMinutes) expirationMinutes = response.data.ExpirationMinutes;

                            now.setMinutes(now.getMinutes() + expirationMinutes);

                            $sessionStorage.user = response.data;
                            $rootScope.user = $sessionStorage.user;
                            $rootScope.token = "Basic " + response.data.Token;

                            /* Seteo de valores en los cookies */
                            $cookies.put('token', $rootScope.token, { expires: now });
                            $cookies.put('user', $sessionStorage.user.name, { expires: now });

                            $location.path("/home");
                        }
                        else {
                            $sessionStorage.user = null;
                        }
                    }
                };

                var errorCallback = function (response) {

                    loginController.resetUserPassword();
                    loginController.failedLoginCode = response.code;

                }

                utilityService.callHttp({ method: "POST", url: "/api/User/Authenticate", data: $scope.loginUser, callbackSuccess: loginCallback, callbackError: errorCallback });

                return false;
            };

        }]);