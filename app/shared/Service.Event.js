'use strict';

angular.module('app.EventService', [])
	.service('EventService', function($http, API_PATH){
		this.getEvent = function(id) {
			var req = {
				method: 'GET',
				url: [API_PATH.event, '/', id].join('')
			};

			return $http(req);
		};
		return this;
	});