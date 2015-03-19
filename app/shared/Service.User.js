'use strict';

angular.module('App.UserService', [])
.factory('UserService', function ($http, API_PATH, $window) {
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