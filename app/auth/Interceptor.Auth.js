module.exports = function ($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers = {
					'x-access-token': $window.sessionStorage.token,
					'x-key': $window.sessionStorage.email
				};
			}
			return config;
		},
		response: function(response) {
			return response || $q.when(response);
		}
	};
};