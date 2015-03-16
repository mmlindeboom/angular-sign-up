(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = require('./config'),
	MainController = require('./shared/Controller.Main'),
	HttpErrorService = require('./shared/Service.Http_Error'),
	UserService = require('./shared/Service.User'),
	authService = require('./auth/Service.Auth'),
	authInterceptor = require('./auth/Interceptor.Auth'),
	DashController = require('./dashboard/Controller.Dash'),
	LogoutController = require('./login/Controller.Logout'),
	LoginController = require('./login/Controller.Login'),
	RegisterController = require('./register/Controller.Register'),
	LoginErrorDirective = require('./login/Directives.Login').error;

angular.module('App', ['ngRoute'])
	.config(config)
	.run(function($rootScope, $location, AUTH_EVENTS){
	})
	.constant('API_PATH', {
		login: 'http://localhost:3000/login',
		register: 'http://localhost:3000/register',
		user: 'http://localhost:3000/api/v1/user'
	})
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized',
		registerSucceed: 'auth-register-success'
	})
	.controller('MainController', MainController)
	.factory('UserService', UserService)
	.factory('ErrorService', HttpErrorService)
	.controller('RegisterController', RegisterController)
	.controller('LoginController', LoginController)
	.directive('loginError', LoginErrorDirective)
	.controller('LogoutController', LogoutController)
	.controller('DashController', DashController)
	.factory('AuthService', authService)
	.factory('authInterceptor', authInterceptor);



},{"./auth/Interceptor.Auth":2,"./auth/Service.Auth":3,"./config":4,"./dashboard/Controller.Dash":5,"./login/Controller.Login":6,"./login/Controller.Logout":7,"./login/Directives.Login":8,"./register/Controller.Register":9,"./shared/Controller.Main":10,"./shared/Service.Http_Error":11,"./shared/Service.User":12}],2:[function(require,module,exports){
module.exports = function ($rootScope, $q, $window) {
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
};
},{}],3:[function(require,module,exports){
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

				if (status === 401) {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed, data);
				}

			});
	};
	authService.register = function (credentials) {
		return $http
			.post(API_PATH.register, credentials)
			.success(function (data, status, headers, config) {
				if (status === 200) {
					debugger;
					$rootScope.$broadcast(AUTH_EVENTS.registerSucceed, config.data);
				} 
			})
			.error(function (data, status, headers, config) {
				if (status === 409) {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed, data);
				}
			});
	};
	authService.isAuthenticated = function () {
		return !!$window.sessionStorage.token;
	};


	return authService;
};
},{}],4:[function(require,module,exports){
module.exports = function ($httpProvider, $routeProvider, $locationProvider) {
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
		.when('/register', {
			templateUrl: 'app/register/Template.Register.html',
			controller: 'RegisterController'
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
};
},{}],5:[function(require,module,exports){
module.exports = function ($scope, $routeParams, $location, UserService, AuthService) {
	$scope.params = $routeParams;
	$scope.FirstName = null;

	if (!AuthService.isAuthenticated()) {
		$location.path('/login');
	} else {
		UserService.getCurrentUser().then(function (userData) {

			$scope.FirstName = userData.data.FirstName;
		});
	}

	return this;
};
},{}],6:[function(require,module,exports){
module.exports = function ($scope, $rootScope, $routeParams, $location, AuthService, AUTH_EVENTS, ErrorService) {
	$scope.params = $routeParams;
	$scope.credentials = {
		username: '',
		password: ''
	};

	$scope.login = function (credentials) {
		credentials = $scope.credentials;
		AuthService.login(credentials).then(function () {
			$location.path('/dash');
		});
	};
	$scope.$on(AUTH_EVENTS.loginFailed, function(){
		$scope.error = ErrorService.error;
	});
}
},{}],7:[function(require,module,exports){
module.exports = function($scope, $location, $window, $routeParams){
	$scope.params = $routeParams;
	delete $window.sessionStorage.token;
	delete $window.sessionStorage.email;
}
},{}],8:[function(require,module,exports){
module.exports = {
	error: function(){
		return {
			controller: 'LoginController',
			template: '{{error.message}}',
			link: function(scope) {

			}
		};
	}
};
},{}],9:[function(require,module,exports){
module.exports = function($scope, $rootScope, $location, AuthService, AUTH_EVENTS) {

	$scope.credentials = {
		username: "",
		password: ""
	};

	$scope.register = function (credentials) {
		credentials = $scope.credentials;
		AuthService.register(credentials);
	};

	$rootScope.$on(AUTH_EVENTS.registerSucceed, function(event, data){
		AuthService.login(data).then(function(){
			$location.path('/dash');
		});
	});
};
},{}],10:[function(require,module,exports){
module.exports = function ($scope, $rootScope, $route, $routeParams, $location, ErrorService, AUTH_EVENTS) {
	$scope.$route = $route;
	$scope.location = $location;
	$scope.$routeParams = $routeParams;

	$rootScope.$on(AUTH_EVENTS.loginFailed, function(event, data){
		ErrorService.handleError(event, data);
	});
};

},{}],11:[function(require,module,exports){
module.exports = function($location) {
	var service = {
		error: {
			code: '',
			message: ''
		}
	};

	service.handleError = function(event, error){
		service.error = error;
	};
	return service;
};
},{}],12:[function(require,module,exports){
module.exports = function ($http, API_PATH, $window) {
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
}
},{}]},{},[1]);
