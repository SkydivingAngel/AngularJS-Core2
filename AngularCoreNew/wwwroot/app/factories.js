//cookies factory-service
function cookieService($cookies) {

    return {

        setCookie: function (cookieName, cookieValue, expiresMinutes) {
                var today = new Date();
                var expiresValue = new Date(today);
                var minutes = 30;
                if (expiresMinutes) {
                    minutes = expiresMinutes;
                }

                expiresValue.setMinutes(today.getMinutes() + minutes);
                $cookies.put(cookieName, cookieValue, { 'expires': expiresValue });
        },
        getCookie: function (cookieName) {
            return $cookies.get(cookieName);
        },
        clearCookie: function (cookieName) {
            $cookies.remove(cookieName);
        },
        clearAllCookies: function () {
            $cookies.remove('username');
        }
    }
}

//userService factory-service
function userService(cookieService) {

    return {
        setUser: function (userName) {
            cookieService.setCookie('username', userName, 30);
        },
        getUser: function () {
            return angular.isDefined(cookieService.getCookie('username'));
        }
    }
}

//logger factory-service
function logService() {
    return {
        log: function (message, logType) {
            switch (logType) {
                case 'c':
                    console.log(message);
                    break;
                case 'a':
                    alert(message);
                    break;
                default:
                    alert(message);
                    break;
            }
        }
    }
}