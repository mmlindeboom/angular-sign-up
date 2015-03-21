'use strict';

angular.module('app.LoginView', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'app/templates/login.html',
			controller: 'LoginController'
		});
	})
	.controller('LoginController', function ($scope, $rootScope, $routeParams, $location, AuthService, AUTH_EVENTS, HttpService) {
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
		$scope.$on(AUTH_EVENTS.loginFailed, function () {
			$scope.error = HttpService.error;
		});
	})
	.directive({
		error: function () {
			return {
				controller: 'LoginController',
				template: '{{error.message}}',
				link: function (scope) {}
			};
		}
	});