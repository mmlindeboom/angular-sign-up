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
		this.setDate = function(id, data){
			return $http.put([API_PATH.event, '/', id].join(''), { Date: data });
		}
		return this;
	});