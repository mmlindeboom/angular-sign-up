'use strict';

angular.module('app.DashView', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/dash', {
			templateUrl: 'app/templates/dash.html',
			controller: 'DashController'
		});
	})
	.controller('DashController', function ($scope, $routeParams, $location, UserService, AuthService, moment) {
		$scope.params = $routeParams;
		$scope.FirstName = null;

		if (!AuthService.isAuthenticated()) {
			$location.path('/');
		} else {
			UserService.getCurrentUser().success(function (userData) {

				$scope.FirstName = userData.FirstName;
				$scope.UserId = userData.UserId;
				$scope.CreatedAt = moment(userData.createdAt).format('dddd, MMMM do, YYYY');
				$scope.events = userData.events;

			}).error(function(err){

			});
		}

		return this;
	})
	.directive('eventOwner', function(){

		return {
			controller: 'DashController',
			template: '{{eventOwnership}}',
			link: function($scope) {

				if($scope.UserId === $scope.event.CreatedById) {
					$scope.eventOwnership = 'created';
				} else {
					$scope.eventOwnership = 'subscribed';
				}
			}
		};
		
	});