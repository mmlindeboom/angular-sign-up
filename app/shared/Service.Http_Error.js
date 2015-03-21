'use strict';

angular.module('app.HttpService', [])
	.factory('HttpService', function ($location) {
		var service = {
			error: {
				code: '',
				message: ''
			}
		};

		service.handleError = function (event, error) {
			service.error = error;
		};
		return service;
	});