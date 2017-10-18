'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute', 'ui.bootstrap', 'ngSanitize']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/quiz', {templateUrl: 'partial/quiz', controller: QuizCtrl});
    $routeProvider.otherwise({redirectTo: '/quiz'});
    $locationProvider.html5Mode(true);
  }]);
