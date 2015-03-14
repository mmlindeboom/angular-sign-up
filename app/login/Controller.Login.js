module.exports = function ($scope, $rootScope, $routeParams, $location, AuthService, AUTH_EVENTS, ErrorService) {
	$scope.params = $routeParams;
	$scope.credentials = {
		username: '',
		password: ''
	};

	$scope.login = function (credentials) {
		credentials = $scope.credentials;
		AuthService.login(credentials).then(function () {
			$location.path('/dash');
		});
	};
	$scope.$on(AUTH_EVENTS.loginFailed, function(){
		$scope.error = ErrorService.error;
	});
}