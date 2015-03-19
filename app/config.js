'use strict';
angular.module('App.config', [])
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
	});