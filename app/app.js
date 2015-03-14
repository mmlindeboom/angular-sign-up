var config = require('./config'),
	MainController = require('./shared/Controller.Main'),
	HttpErrorService = require('./shared/Service.Http_Error'),
	UserService = require('./shared/Service.User'),
	authService = require('./auth/Service.Auth'),
	authInterceptor = require('./auth/Interceptor.Auth'),
	DashController = require('./dashboard/Controller.Dash'),
	LogoutController = require('./login/Controller.Logout'),
	LoginController = require('./login/Controller.Login'),
	LoginErrorDirective = require('./login/Directives.Login').error;

angular.module('App', ['ngRoute'])
	.config(config)
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
	.controller('MainController', MainController)
	.factory('UserService', UserService)
	.factory('ErrorService', HttpErrorService)
	.controller('LoginController', LoginController)
	.directive('loginError', LoginErrorDirective)
	.controller('LogoutController', LogoutController)
	.controller('DashController', DashController)
	.factory('AuthService', authService)
	.factory('authInterceptor', authInterceptor);


