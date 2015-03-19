'use strict';

angular.module('App.LogoutController', [])
	.controller('LogoutController', function ($scope, $location, $window, $routeParams) {
		$scope.params = $routeParams;
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.email;
	});