angular.module('chartsApp',[
	'ui.router',
	'ngAnimate'
])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '',
          controller: ''
        });
  }]);