'use strict';

angular.module('app.RegisterView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/register', {
			templateUrl: 'app/components/register/Template.Register.html',
			controller: 'RegisterController'
		});
	})
	.controller('RegisterController', function ($scope, $rootScope, $location, AuthService, AUTH_EVENTS) {
		$scope.credentials = {
			username: '',
			password: ''
		};

		$scope.register = function (credentials) {
			credentials = $scope.credentials;
			AuthService.register(credentials);
		};

		$rootScope.$on(AUTH_EVENTS.registerSucceed, function (event, data) {
			AuthService.login(data).then(function () {
				$location.path('/dash');
			});
		});
	})
	.directive('register-error', {
		error: function () {
			return {
				controller: 'RegisterController',
				template: '{{error.message}}',
				link: function (scope) {}
			};
		}
	});