'use strict';

angular.module('app.moment', [])
	.factory('moment', function($window){

		var moment = $window.moment;

		delete $window.moment;

		return moment;
	});