'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
};

function ResultsModalCtrl($scope, $modalInstance, $window, $route) {
    $scope.quit = function() {
        $modalInstance.close();
    }
    $scope.newQuiz = function() {
        $modalInstance.close();
        //$scope.testing = false;
        //$scope.finished = false;
        //$scope.timer = '00:00';
        //$scope.correct = 0;
        $route.reload();
    }
};

function QuizCtrl($scope, $http, $location, $timeout, $modal) {

  $scope.testing = false;
  $scope.finished = false;
  $scope.problems = [];
  $scope.timer = '00:00';
  $scope.correct = 0;

  $scope.form = {
    problemcount : 50,
    factor1low : 2,
    factor1high : 5,
    factor2low : 0,
    factor2high : 12,
  }

  $scope.createQuiz = function () {
    $http.post('/api/quiz', $scope.form).
      success(function(data) {
        $scope.problems = data;
        $scope.testing = true;
        startTimer(3.6*$scope.form.problemcount);
      });
  };

  var checkAnswer = function() {
    angular.forEach($scope.problems, function( problem ){
        if(problem.answer == problem.useranswer) {
            problem.class = 'correct';
            $scope.correct++;
        } else {
            console.log("Wrong: " + problem);
            problem.class = 'incorrect';
        }
    });

    var modalInstance = $modal.open({
        templateUrl: 'partial/results.jade',
        controller: 'ResultsModalCtrl',
        scope: $scope
    });
  }

  function startTimer(duration) {
    console.log("Timer started");
    var timer = duration, minutes, seconds;

    var tick = function() {
        console.log(minutes + ":" + seconds);
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $scope.timer = minutes + ":" + seconds;

        if (--timer < 0) {
            $scope.finished = true;
            checkAnswer();
            return;
        }
        $timeout(tick, 1000);
    }
    tick();
  }
}

