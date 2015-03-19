'use strict';
angular.module('App.DashController', [])
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