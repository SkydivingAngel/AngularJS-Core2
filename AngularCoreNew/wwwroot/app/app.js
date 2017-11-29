var AngularCoreApp = angular.module('AngularCoreApp', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate']);

AngularCoreApp
    .controller('LoginViewCtrl', LoginViewCtrl)
    .controller('HomeViewCtrl', HomeViewCtrl)
    .controller('ProdottiCtrl', ProdottiCtrl)
    .constant('loginUrl', '/AngularCore/CheckLogin')
    .constant('dataUrl', '/AngularCore/GetProducts')
    .constant('warmUpUrl', '/AngularCore/WarmUpCall')
    .factory('userService', userService)
    .factory('cookieService', cookieService)
    .factory('logService', logService)
    .directive('siteNavbar', siteNavbar)
    .filter('convertDateTime', convertDateTime);

var configFunction = function ($routeProvider, $httpProvider, $locationProvider) {

    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
        .when('/',
        {
            redirectTo: '/home'
        })
        .when('/login',
            {
                templateUrl: '/angularcore/views/login.html',
                controller: 'LoginViewCtrl'
            })
        .when('/home',
        {
            templateUrl: '/angularcore/views/home.html',
            controller: 'HomeViewCtrl'
        })
        .when('/prodotti',
        {
            templateUrl: '/angularcore/views/prodotti.html',
            controller: 'ProdottiCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
}

AngularCoreApp.config(configFunction);
AngularCoreApp.run(run);

function run($rootScope, $location, $window, $animate, userService, cookieService, logService) {

    $animate.enabled(true);
    $animate.enabled(document.querySelector('#view-container'), true);

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        //Debug
        //logService.log("$location.path: " + $location.path() + " - next: " + next, 'c');
        var loggedIn = userService.getUser();
        if (!loggedIn) {
            $location.path('/login').replace();
        }
    });
}