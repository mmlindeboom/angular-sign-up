
angular.module('app', [
		'ngRoute',
		'app.authInterceptor',
		'app.AuthService',
		'app.HttpService',
		'app.DashView',
		'app.LoginView',
		'app.LogoutView',
		'app.RegisterView',
		'app.UserService',
		'app.HttpService'
	])
	.config(function ($httpProvider, $routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/dash'
			});
		$httpProvider.interceptors.push('authInterceptor');
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
		registerSucceed: 'auth-register-success',
		httpError: 'auth-http-error'
	});

