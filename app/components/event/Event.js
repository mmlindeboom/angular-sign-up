'use strict';

angular.module('app.EventView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/event/:id', {
			templateUrl: 'app/components/event/event.html',
			controller: 'EventController'
		});
	})
	.controller('EventController', function ($scope, $routeParams, $location, EventService, moment) {
		$scope.params = $routeParams;
		$scope.noEvent = true;
		$scope.error = {};
		$scope.event = {};
		EventService.getEvent($scope.params.id).success(function(event){
				$scope.event = event;
			}).error(function(error){
				$scope.noEvent = false;
				$scope.error = error;
			});
		return this;
	})
	.directive('event-detail', {
		scope: {
			data: '=type'
		},
		controller: 'EventController',
		template: '{{data}}'
	});