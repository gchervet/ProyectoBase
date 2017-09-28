angular.module('app')
  .controller('homeController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var homeController = this;
      homeController.userFullName = '';
      homeController.userPermission = '';

      homeController.menuGroupList = [];

      homeController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          homeController.userFullName = $sessionStorage.user.name;
          homeController.userPermission = $sessionStorage.user.permissions;

          homeController.getAllMenu();

          //if (Auth.userHasPermission(["administration"])) {
          //    var userName = Auth.currentUser().name;
          //}
          //else {
          //    homeController.logout();
          //}
      };

      homeController.logout = function () {

          Auth.logout();
          $location.path("/login");

      };

      homeController.requestTest = function () {
          Auth.tokenCookieExists();


          var testCallback = function (response) {
              debugger;
          };

          var testErrorCallback = function (response) {
              debugger;

          }

          utilityService.callHttp({ method: "GET", url: "/api/uniAlumno/GetByLegajo?legajo=12345", callbackSuccess: testCallback, callbackError: testErrorCallback });
      };

      homeController.getAllMenu = function () {
          Auth.tokenCookieExists();


          var getAllMenuCallback = function (response) {
              if (response) {

                  // Se setea el valor de menú al front end
                  homeController.menuGroupList = response.data;

                  for (var menuGroupIndex in homeController.menuGroupList) {
                      var actualMenuGroup = homeController.menuGroupList[menuGroupIndex];

                      // Variable que define si el menú debe mostrarse o no
                      actualMenuGroup.Show = false;
                      for (var menuIndex in actualMenuGroup.MenuList) {
                          
                          // Algoritmo que resuelve los permisos por cada pantalla, en cada botón
                          var actualMenu = actualMenuGroup.MenuList[menuIndex];
                          actualMenu.PermissionString = "[";
                          for (var permissionIndex in actualMenu.PermissionList) {
                              var actualMenuPermission = actualMenu.PermissionList[permissionIndex];

                              // Si el usuario cuenta con al menos un permiso de la lista, se muestra el menú principal
                              if (homeController.userPermission.indexOf(actualMenuPermission.Name) != -1) {
                                  actualMenuGroup.Show = true;
                              }

                              actualMenu.PermissionString += '"' + actualMenuPermission.Name + '"';
                              if (actualMenu.PermissionList.length > 1 && (Number(permissionIndex) + 1) < actualMenu.PermissionList.length) {
                                  actualMenu.PermissionString += ',';
                              }
                          }
                          actualMenu.PermissionString += "]";
                      }                      
                  }
              }

              
              $('.nav li.dropdown').hover(function () {
                  $(this).addClass('open');
              }, function () {
                  $(this).removeClass('open');
              });
          };

          var getAllMenuErrorCallback = function (response) {
              debugger;

          }

          utilityService.callHttp({ method: "GET", url: "/api/menu/getall", callbackSuccess: getAllMenuCallback, callbackError: getAllMenuErrorCallback });
      };

  });