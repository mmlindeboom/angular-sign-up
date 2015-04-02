'use strict';

angular.module('app.EventView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/event/:id', {
			templateUrl: 'app/components/event/event.html',
			controller: 'EventController'
		});
	})
	.controller('EventController', function ($scope, $routeParams, $location, EventService, moment) {
		//set default values
		var self = this;

		$scope.params = $routeParams;
		$scope.noEvent = false;
		$scope.error = {};
		$scope.details = {};

		//initialize
		EventService.getEvent($scope.params.id).success(function(details){
				$scope.details = details;
			}).error(function(error){
				$scope.noEvent = true;
				$scope.error = error;
			});

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		 };
		$scope.dt = new Date();
		$scope.setDate = function($event) {
			EventServices.setEventDate($scope.dt).success(function(){
				
			});
		}
		this.checkDetail = function(detail){
			$scope.$watch(detail, function(newDetail){
				$scope.detail = newDetail;
			});
			if($scope[detail] === undefined) {
				switch(detail) {
					case 'date': 
						$scope.isEmpty = true;
						$scope[detail] = {
							header: 'Date',
						}
						$scope.dt = new Date();
						break;
				}
			}
		}

		return this;
	})
	.directive('eventDetail', function($compile){
		return {
			controller: 'EventController',
			scope: {
				detail: "="
			},
			templateUrl: 'app/components/event/event-detail.html',
			link: function($scope, $element, $attrs, EventController){
				$element.children('.panel').addClass('panel-warning');
				EventController.checkDetail($attrs.detail);
			}
		};
	})
	.directive('setEventDate', function(){
		return {
			controller: 'EventController',
			templateUrl: 'app/components/event/set-event-date.html',
		};
	});