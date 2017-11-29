function LoginViewCtrl($scope, $http, $location, loginUrl, warmUpUrl, userService, logService, cookieService, $sanitize, $window) {

    var loading = false;
    var loginError = false;
    $scope.isLoading = isLoading;
    $scope.login = login;
    $scope.see = see;
    $scope.setFocus = setFocus;
    $scope.warmUpCall = warmUpCall;
    $scope.showHidePassword = showHidePassword;
    $scope.sanitizeCredentials = sanitizeCredentials;
    $scope.isLoginError = isLoginError;
    $scope.passwordInputType = 'password';
    $scope.customGlyphicon = 'glyphicon-eye-open';

    function showHidePassword() {
        if ($scope.passwordInputType === 'password')
        {
            $scope.passwordInputType = 'text';
            $scope.customGlyphicon = 'glyphicon-eye-close';
        }
        else
        {
            $scope.passwordInputType = 'password';
            $scope.customGlyphicon = 'glyphicon-eye-open';
        }
    };

    function sanitizeCredentials() {
        return {
            username: $sanitize($scope.user.username),
            password: $sanitize($scope.user.password)
        };
    }

    function login(user) {
        //alert(loginUrl);
        if (angular.isDefined(user) && angular.isDefined(user.username) && angular.isDefined(user.password)) {
            loading = true;
            loginError = false;

            $http({
                method: 'POST',
                url: loginUrl,
                timeout: 10000,
                data: $.param(sanitizeCredentials(user)), //invia i dati come stringa
                headers: { 'content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function mySuccess(response) {
                    loading = false;
                    loginError = false;
                    userService.setUser(user.username);
                    $location.path('/home').replace();
                },
                function errorCallback(response) {
                    //alert(loginUrl);
                    //alert(response.status);
                    //alert(response.statusText);
                    loading = false;
                    loginError = true;
                    $scope.passwordInputType = 'password';
                    $scope.customGlyphicon = 'glyphicon-eye-open';
                    setFocus();

                    $('.validation').transition('shake');
                });
        }
    }

    function warmUpCall() {
        $http({
            method: 'GET',
            url: warmUpUrl
        })
            .then(function mySuccess(response) {
            },
            function errorCallback(response) {
                //alert(response.status);
                //alert(response.statusText);
            });
    }

    function isLoading() {
        return loading;
    }

    function isLoginError() {
        return loginError;
    }

    function setFocus() {
        angular.element('#Username').focus();
    }

    function see() {
        alert('see');
    }

    warmUpCall();
    setFocus();
}


function HomeViewCtrl($scope, $http, $location, dataUrl, userService, cookieService) {
    angular.element('#boo').focus();
}

function ProdottiCtrl($scope, $http, $location, dataUrl, userService, cookieService, logService) {

    $scope.searchText = '';
    $scope.prodotti = [];
    $scope.scaricaProdotti = scaricaProdotti;
    $scope.clearProdotti = clearProdotti;
    $scope.disableAdd = disableAdd;
    $scope.isLoading = isLoading;

    var loading = false;

    function scaricaProdotti() {
        loading = true;
        $http({
            method: 'GET',
            url: dataUrl,
            timeout: 15000
        })
            .then(function mySuccess(response) {
                $scope.prodotti = response.data;
                loading = false;
                //logService.log($scope.prodotti.length);
            },
            function errorCallback(response) {
                //alert(response.data);
                //alert(response.status);
                //alert(response.statusText);
            });
    }

    function disableAdd() {
        return $scope.prdotti.length === 0;
    }

    function isLoading() {
        return loading;
    }

    function clearProdotti() {
        $scope.searchText = '';
        return $scope.prodotti = [];
    }
}
