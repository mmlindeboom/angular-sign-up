'use strict';

angular.module('app.RegisterView', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/components/register/Template.Register.html',
			controller: 'RegisterController'
		});
	})
	.controller('RegisterController', function ($scope, $rootScope, $location, AuthService, AUTH_EVENTS) {
		if(AuthService.isAuthenticated()){
			$location.path('/dash');
		}
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.error = {};
		$scope.register = function (credentials) {
			credentials = $scope.credentials;
			AuthService.register(credentials);
		};

		$scope.$on(AUTH_EVENTS.registerSucceed, function (event, data) {
			AuthService.login(data).then(function () {
				$location.path('/dash');
			});
		});
		$scope.$on(AUTH_EVENTS.registerFail, function (event, error) {
			$scope.error = error;
		});
	})
	.directive('registerError', function () {
		return {
			controller: 'RegisterController',
			template: '{{error.message}}',
		};
	});