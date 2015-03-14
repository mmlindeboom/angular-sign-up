module.exports = function ($http, $rootScope, API_PATH, AUTH_EVENTS, $location, $window) {
	var authService = {};
	authService.login = function (credentials) {
		return $http
			.post(API_PATH.login, credentials)
			.success(function (data, status, headers, config) {

				//set token in sessionStorage
				$window.sessionStorage.token = data.token;
				$window.sessionStorage.email = config.data.username;
			})
			.error(function (data, status, headers, config) {
				//delete token of login is wrong
				delete $window.sessionStorage.token;

				if(status === 401) {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed, data);
				}
				
			});
	};
	authService.isAuthenticated = function(){
		return !!$window.sessionStorage.token;
	};
	return authService;
};