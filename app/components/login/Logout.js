'use strict';

angular.module('app.LogoutView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/logout', {
			templateUrl: 'app/templates/logout.html',
			controller: 'LogoutController'
		});
	})
	.controller('LogoutController', function ($scope, $rootScope, $location, $window, $routeParams, AUTH_EVENTS) {
		$scope.params = $routeParams;
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.email;
	});