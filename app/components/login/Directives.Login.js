'use strict';

angular.module('App.LoginDirective', [])
	.directive({
		error: function () {
			return {
				controller: 'LoginController',
				template: '{{error.message}}',
				link: function (scope) {}
			};
		}
	});