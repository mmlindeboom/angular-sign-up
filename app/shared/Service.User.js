'use strict';

angular.module('app.UserService', [])
	.factory('UserService', function ($http, $window, API_PATH) {
		this.getCurrentUser = function () {
			var req = {
				method: 'GET',
				url: API_PATH.user,
				params: {
					username: $window.sessionStorage.email
				}
			};

			return $http(req);
		};
		return this;
	});