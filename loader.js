$script([
	'bower_components/angular/angular.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/lodash/lodash.min.js',
	'app/app.js',
	'app/libs/ng.lodash.js',
	'app/shared/Service.User.js',
	'app/components/auth/Service.Auth.js',
	'app/components/auth/Interceptor.Auth.js',
	'app/components/dashboard/Dash.js',
	'app/components/login/Logout.js',
	'app/components/login/Login.js',
	'app/components/register/Register.js',
], function () {

	angular.bootstrap(document, ['app']);
});