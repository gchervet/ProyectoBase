app.controller("loginController", [
        "$scope",
        "$rootScope",
        "$location",
        "$state",
        "$uibModal",
        "myUrl",
        "$window",
        "utilityService",
        "$sessionStorage",
        "Auth",
        function ($scope, $rootScope, $location, $state, $uibModal, myUrl, $window, utilityService, $sessionStorage, Auth) {

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


                if (Auth.userHasPermission(["administration"])) {
                    // some evil logic here
                    var userName = Auth.currentUser().name;
                    // ...
                }

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

                //Auth.login($scope.loginUser)
                // .then(function () {
                //     $location.path("/home");
                // }, function () {
                //     $scope.failed = true;
                // });
                
                var loginCallback = function (response) {
                    debugger;

                    if (response) {
                        loginController.failedLoginCode = response.data.FailedLoginCode;

                        $sessionStorage.user = response.data;
                        $rootScope.user = $sessionStorage.user;
                        $rootScope.token = "Basic " + response.data;

                        $location.path("/home");
                    }
                    loginController.handleLoginResponse(response);
                };

                var errorCallback = function (response) {
                    loginController.resetUserPassword();
                    loginController.failedLoginCode = response.code;
                    
                    Auth.reject();
                }

                utilityService.callHttp({ method: "POST", url: "/api/User/Authenticate", data: $scope.loginUser, callbackSuccess: loginCallback, callbackError: errorCallback });


                return false;
            };

        }]);