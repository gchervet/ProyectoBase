angular.module('app')
.directive('permission', ['Auth', function (Auth) {
    return {
        restrict: 'A',
        scope: {
            permission: '@'
        },

        link: function (scope, elem, attrs) {
            scope.$watch(Auth.isLoggedIn, function () {

                scope.permission = JSON.parse(attrs.permission);
                if (Auth.userHasPermission(scope.permission)) {
                    $(elem).show();
                } else {
                    $(elem).hide();
                }
            });
        }
    }
}]);