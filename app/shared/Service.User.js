'use strict';

angular.module('app.UserService', [])
	.factory('UserService', function ($http, $window, API_PATH) {
		this.getCurrentUser = function () {
			var req = {
				method: 'GET',
				url: API_PATH.userProfile
			};

			return $http(req);
		};
		return this;
	});