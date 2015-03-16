module.exports = function($scope, $rootScope, $location, AuthService, AUTH_EVENTS) {

	$scope.credentials = {
		username: "",
		password: ""
	};

	$scope.register = function (credentials) {
		credentials = $scope.credentials;
		AuthService.register(credentials);
	};

	$rootScope.$on(AUTH_EVENTS.registerSucceed, function(event, data){
		AuthService.login(data).then(function(){
			$location.path('/dash');
		});
	});
};