'use strict';

angular.module('app.LogoutView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/logout', {
			templateUrl: 'app/templates/logout.html',
			controller: 'LogoutController'
		});
	})
	.controller('LogoutController', function ($scope, $location, $window, $routeParams) {
		$scope.params = $routeParams;
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.email;
	});