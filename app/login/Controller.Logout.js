module.exports = function($scope, $location, $window, $routeParams){
	$scope.params = $routeParams;
	delete $window.sessionStorage.token;
	delete $window.sessionStorage.email;
}