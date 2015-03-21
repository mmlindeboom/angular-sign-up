'use strict';

angular.module('app.DashView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/dash', {
			templateUrl: 'app/templates/dash.html',
			controller: 'DashController'
		});
	})
	.controller('DashController', function ($scope, $routeParams, $location, UserService, AuthService) {
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
	});