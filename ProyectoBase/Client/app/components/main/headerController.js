angular.module('app')
  .controller('headerController', function ($scope, $rootScope, $location, $sessionStorage, utilityService, Auth) {

      var headerController = this;
      headerController.userFullName = '';
      headerController.userPermission = '';

      headerController.menuGroupList = [];

      headerController.init = function () {

          Auth.tokenCookieExists();

          if ($sessionStorage.user == null) {
              $rootScope.logout();
          }

          headerController.userFullName = $sessionStorage.user.name;
          headerController.userPermission = $sessionStorage.user.permissions;

          headerController.getAllMenu();

          //if (Auth.userHasPermission(["administration"])) {
          //    var userName = Auth.currentUser().name;
          //}
          //else {
          //    headerController.logout();
          //}
      };

      headerController.logout = function () {

          Auth.logout();
          $location.path("/login");

      };
      
      headerController.getAllMenu = function () {
          Auth.tokenCookieExists();


          var getAllMenuCallback = function (response) {
              if (response) {

                  // Se setea el valor de menú al front end
                  headerController.menuGroupList = response.data;

                  for (var menuGroupIndex in headerController.menuGroupList) {
                      var actualMenuGroup = headerController.menuGroupList[menuGroupIndex];

                      // Variable que define si el menú debe mostrarse o no
                      actualMenuGroup.Show = false;
                      for (var menuIndex in actualMenuGroup.MenuList) {

                          // Algoritmo que resuelve los permisos por cada pantalla, en cada botón
                          var actualMenu = actualMenuGroup.MenuList[menuIndex];
                          actualMenu.PermissionString = "[";
                          for (var permissionIndex in actualMenu.PermissionList) {
                              var actualMenuPermission = actualMenu.PermissionList[permissionIndex];

                              // Si el usuario cuenta con al menos un permiso de la lista, se muestra el menú principal
                              if (headerController.userPermission.indexOf(actualMenuPermission.Name) != -1) {
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
              // Qué hacer en caso de error?
          }

          utilityService.callHttp({ method: "GET", url: "/api/menu/getall", callbackSuccess: getAllMenuCallback, callbackError: getAllMenuErrorCallback });
      };

  });