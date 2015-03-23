'use strict';

angular.module('app._', [])
	.factory('_', function($window){

		var _ = $window._;

		delete $window._;

		return _;
	});