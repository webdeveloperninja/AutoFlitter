var app = angular.module('AutoApp', ['ngRoute']);
app.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'partials/welcome.html',
			controller: 'WelcomeController'
		})
		.when('/new-dealer', {
			templateUrl: 'partials/new-dealer.html',
			controller: 'NewDealerController'
		})
		.when('/settings', {
		    templateUrl: 'partials/settings.html',
		    controller: 'SettingsController'
		})
		.when('/main-menu', {
		    templateUrl: 'partials/main-menu.html', 
		    controller: 'MainMenuController'
		})
		.when('/tweet', {
			templateUrl: 'partials/tweet.html',
			controller: 'TweetController'
		})
		.when('/login', {
		    templateUrl: 'partials/login.html',
		    controller: 'LoginController'
		})
		.otherwise({
			templateUrl: 'partials/lost.html',
		});
});