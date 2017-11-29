//navbar directive
function siteNavbar() {

    return {
        link: function(scope, element, attrs) {
            scope.data = scope[attrs["siteNavbar"]];
        },
        restrict: 'E',
        //scope: {},
        replace: true,
        templateUrl: 'views/navbar.html',
        controller: function ($scope, $location, cookieService) {

            $scope.isVisible = function () {
                return $location.path().indexOf('login') === -1;
            };

            $scope.isActive = function (path) {

                var splitted = $location.path().split('/');
                return splitted[splitted.length-1] === path;
            };

            $scope.logout = function () {
                $scope.collapse();
                cookieService.clearAllCookies();
                $location.path('/login').replace();
            }

            $scope.collapse = function (){
                $('#myNavbar').collapse('hide');
            }
        }
    }
}
