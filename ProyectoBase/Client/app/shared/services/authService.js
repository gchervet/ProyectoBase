angular.module('AuthServices', ['ngResource', 'ngStorage'])
.factory('Auth', function ($resource, $rootScope, $sessionStorage, $q, $cookies, $location) {

    /**
     *  User profile resource
     */
    var Profile = $resource('/api/User/Authenticate', {}, {
        login: {
            method: "POST",
            isArray: false
        }
    });

    var auth = {};

    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    auth.init = function () {
        if (auth.isLoggedIn()) {
            $rootScope.user = auth.currentUser();
        }
    };

    auth.login = function (loginUser) {
        return $q(function (resolve, reject) {

            Profile.login({ username: loginUser.UserName, password: loginUser.Password }).$promise
            .then(function (data) {
                $sessionStorage.user = data;
                $rootScope.user = $sessionStorage.user;
                resolve();
            }, function () {
                reject();
            });
        });
    };


    auth.logout = function () {

        /* Se limpian los datos de usuario y cookies */
        delete $sessionStorage.user;
        delete $rootScope.user;
        $cookies.remove('token');
    };


    auth.checkPermissionForView = function (view) {
        if (!view.requiresAuthentication) {
            return true;
        }

        return userHasPermissionForView(view);
    };


    var userHasPermissionForView = function (view) {
        if (!auth.isLoggedIn()) {
            return false;
        }

        if (!view.permissions || !view.permissions.length) {
            return true;
        }

        return auth.userHasPermission(view.permissions);
    };


    auth.userHasPermission = function (permissions) {

        /* Antes de verificar los permisos, verificamos si el usuario se encuentra logueado */
        if (!auth.isLoggedIn()) {
            return false;
        }

        var found = false;

        if ($sessionStorage.user.permissions) {
            angular.forEach(permissions, function (permission, index) {
                if ($sessionStorage.user.permissions.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });
        }
        else {
            found = true;
        }

        return found;
    };


    auth.userHasPermissionNonExcluding = function (permissions) {

        /* Antes de verificar los permisos, verificamos si el usuario se encuentra logueado */
        if (!auth.isLoggedIn()) {
            return false;
        }

        var found = false;

        if ($sessionStorage.user.permissions) {
            angular.forEach(permissions, function (permission, index) {
                if ($sessionStorage.user.permissions.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });
        }
        else {
            found = true;
        }

        return found;
    };


    auth.userHasPermissionExluding = function (permissions) {

        /* Antes de verificar los permisos, verificamos si el usuario se encuentra logueado */
        if (!auth.isLoggedIn()) {
            return false;
        }

        var found = true;

        if ($sessionStorage.user.permissions) {
            angular.forEach(permissions, function (permission, index) {
                if (!($sessionStorage.user.permissions.indexOf(permission) >= 0)) {
                    found = false;
                    return;
                }
            });
        }
        else {
            found = true;
        }

        return found;
    };

    auth.currentUser = function () {
        return $sessionStorage.user;
    };


    auth.isLoggedIn = function () {
        return $sessionStorage.user != null;
    };

    auth.tokenCookieExists = function () {
        if (!$cookies.get('token')) {
            $location.url('/login?path=' + encodeURIComponent($location.absUrl()));
        }
    }

    return auth;
});