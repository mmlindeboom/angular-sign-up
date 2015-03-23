'use strict';

angular.module('app.LoginView', ['ngRoute'])
	.controller('LoginController', function ($scope, $rootScope, $routeParams, $location, AuthService, AUTH_EVENTS) {
		$scope.params = $routeParams;
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.authenticated = AuthService.isAuthenticated();

		$scope.login = function (credentials) {
			credentials = $scope.credentials;
			AuthService.login(credentials).then(function () {
				$location.path('/dash');
				$scope.authenticated = true;
			});
		};
		$scope.$on(AUTH_EVENTS.loginFailed, function (event, error) {
			$scope.error = error;
		});
		$scope.$on(AUTH_EVENTS.logoutSuccess, function(){
			$scope.authenticated = false;
		});
	})
	.directive('loginForm', function ($compile) {
		var getTemplate = function(authenticated){
				if(authenticated) {
					return '<ul class="nav navbar-nav"><li><a href="#/logout">Logout</a></li></ul>';
				} else {
					return '<div ng-include src="\'app/templates/login.html\'" />';
				}
			};
		return {
			controller: 'LoginController',
			replace: true,
			link: function(scope, element) {
				scope.$watch('authenticated', function(newValue, oldValue){
					element.html(getTemplate(newValue));
					$compile(element.contents())(scope);
				});
			}
		};
	})
	.directive('loginError', function (_) {
		return {
			controller: 'LoginController',
			link: function (scope) {
				scope.$watch('error', function (newError, noError) {
					if(_.isObject(newError)){
						if (!_.isUndefined(newError.message)) {
							alert(newError.message);
						}
					}
				});
			}
		};
	});