angular.module('AuthServices', ['ngResource', 'ngStorage'])
.factory('Auth', function ($resource, $rootScope, $sessionStorage, $q) {

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
        delete $sessionStorage.user;
        delete $rootScope.user;
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
        if (!auth.isLoggedIn()) {
            return false;
        }

        var found = false;
        angular.forEach(permissions, function (permission, index) {
            if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0) {
                found = true;
                return;
            }
        });

        return found;
    };


    auth.currentUser = function () {
        return $sessionStorage.user;
    };


    auth.isLoggedIn = function () {
        return $sessionStorage.user != null;
    };


    return auth;
});