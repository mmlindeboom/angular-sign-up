angular.module('app', [
		'ngRoute',
		'app._',
		'app.authInterceptor',
		'app.AuthService',
		'app.DashView',
		'app.LoginView',
		'app.LogoutView',
		'app.RegisterView',
		'app.UserService'
	])
	/**
	 * Instantiate 3rd party libs after bootstrap
	 */
	.run(function (_) {})
	.config(function ($httpProvider, $routeProvider) {
		$routeProvider.otherwise({
			redirectTo: '/'
		})
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
		registerFail: 'auth-register-error'
	});