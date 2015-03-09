angular.module('App', ['ngRoute'])
	.config(function ($httpProvider, $routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/dash'
			})
			.when('/dash', {
				templateUrl: 'app/templates/dash.html',
				controller: 'DashController'
			})
			.when('/login', {
				templateUrl: 'app/templates/login.html',
				controller: 'LoginController'
			})
			.when('/logout', {
				templateUrl: 'app/templates/logout.html',
				controller: 'LogoutController'
			})
			.when('/error', {
				templateUrl: 'app/templates/error.html',
				controller: 'ErrorController'
			});
		$httpProvider.interceptors.push('authInterceptor');
	})
	.run(function($rootScope, $location, AUTH_EVENTS){
	})
	.constant('API_PATH', {
		login: 'http://localhost:3000/login',
		user: 'http://localhost:3000/api/v1/user',
		event: 'http://localhost:3000/api/v1/event'
	})
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})
	.controller('MainController', function ($scope, $rootScope, $route, $routeParams, $location, ErrorService, AUTH_EVENTS) {
		$scope.$route = $route;
		$scope.location = $location;
		$scope.$routeParams = $routeParams;

		$rootScope.$on(AUTH_EVENTS.loginFailed, function(event, data){
			ErrorService.handleError(event, data);
		});
	})
	.factory('UserService', function ($http, API_PATH, $window) {
		this.getCurrentUser = function () {
			var req = {
				method: 'GET',
				url: API_PATH.user,
				params: {
					username: $window.sessionStorage.email
				}
			};

			return $http(req);
		};
		return this;
	})
	.factory('ErrorService', function($location, ErrorController) {
		this.handleError = function(event, error){
			$location.path('/error');
			ErrorController.setErrorState(error, 'Invalid credentials');
		}
		return this;
	})
	.controller('LoginController', function ($scope, $rootScope, $routeParams, $location, AuthService) {
		$scope.params = $routeParams;
		$scope.credentials = {
			username: '',
			password: ''
		};

		$scope.login = function (credentials) {
			AuthService.login(credentials).then(function () {
				$location.path('/dash');
			});
		};
	})
	.controller('ErrorController', function($scope, $rootScope, $routeParams, AUTH_EVENTS){
		$scope.params = $routeParams;
		$scope.error = 0;
		$scope.message = 'There was an error';

		$scope.setErrorState = function(error, message) {
			$scope.error = error;
			$scope.message = message;
		}
	})
	.controller('LogoutController', function($scope, $location, $window, $routeParams){
		$scope.params = $routeParams;
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.email;
	})
	.controller('DashController', function ($scope, $routeParams, $location, UserService, AuthService) {
		
		$scope.params = $routeParams;
		$scope.FirstName = null;

		if(!AuthService.isAuthenticated()) {
			$location.path('/login');
		} else {
			UserService.getCurrentUser().then(function (userData) {

				$scope.FirstName = userData.data.FirstName;
			});
		}
		

		return this;
	})
	.factory('AuthService', function ($http, $rootScope, API_PATH, AUTH_EVENTS, $location, $window) {
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
						$rootScope.$broadcast(AUTH_EVENTS.loginFailed, 401);
					}
					
				});
		};
		authService.isAuthenticated = function(){
			return !!$window.sessionStorage.token;
		};
		return authService;
	})
	.factory('authInterceptor', function ($rootScope, $q, $window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.sessionStorage.token) {
					config.headers = {
						'x-access-token': $window.sessionStorage.token,
						'x-key': $window.sessionStorage.email
					};
				}
				return config;
			},
			response: function(response) {
				return response || $q.when(response);
			}
		};
	});