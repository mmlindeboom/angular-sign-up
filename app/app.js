angular.module('App', [])
	.constant('API_PATH', {
		login: 'http://localhost:3000/login',
		user: 'http://localhost:3000/api/v1/user'
	})
	.controller('LoginController', function($scope, $rootScope, AuthService, UserService){
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.login = function(credentials) {
			AuthService.login(credentials).then(function(){

				UserService.getCurrentUser();
			});
		}
	})
	.controller('ApplicationController', function($scope, UserService){
		$scope.currentUser = null;

		$scope.setCurrentUser = UserService.getCurrentUser;
	})
	.factory('UserService', function($http, Session, API_PATH){
		this.getCurrentUser = function(){
			var req = {
				method: 'GET',
				url: API_PATH.user,
				headers: {
					'x-access-token': Session.token,
					'x-key': Session.username,
					'content-type': 'application/json'
				}
			};
			$http(req)
				.then(function(results){
					debugger;
				});
		};
		return this;
	})
	.factory('AuthService', function ($http, Session, API_PATH) {
		var authService = {};

		authService.login = function (credentials) {
			return $http
				.post(API_PATH.login, credentials)
				.then(function (res){

					Session.create(res.data.token, res.data.expires, res.config.data.username);
				});
		}

		return authService;
	})
	.factory('Session', function(){
		this.create = function(sessionToken, sessionExpires, sessionUsername) {
			this.token = sessionToken;
			this.username = sessionUsername;
			this.expires = sessionExpires;
		}
		return this;
	});