'use strict';

app.module('App.MainController', [])
	.controller('MainController', function ($scope, $rootScope, $route, $routeParams, $location, ErrorService, AUTH_EVENTS) {
		$scope.$route = $route;
		$scope.location = $location;
		$scope.$routeParams = $routeParams;

		$rootScope.$on(AUTH_EVENTS.loginFailed, function (event, data) {
			ErrorService.handleError(event, data);
		});
	});