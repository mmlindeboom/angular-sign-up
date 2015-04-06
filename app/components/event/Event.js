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
				$scope.dt = $scope.details.Date || new Date();

			}).error(function(error){
				$scope.noEvent = true;
				$scope.error = error;
			});
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		 };

		$scope.setDate = function($event) {
			EventService.setDate($scope.params.id, $scope.dt).then(function(response){
				//TODO confirm success;
			});
		}
		this.checkDetail = function(detail){
			$scope.$watch(detail, function(newDetail){
				$scope.detail = newDetail;
			});
			switch(detail) {
				case 'Date': 
					$scope.isEmpty = true;
					$scope[detail] = {
						header: 'Date',
					}
				break;
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