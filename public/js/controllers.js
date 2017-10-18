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
    $scope.ok = function() {
        $modalInstance.close();
    }
};

function ReadyModalCtrl($scope, $modalInstance, $timeout) {
    $scope.message = 'Click <b>Start</b> when you are ready to begin.';

    $scope.cancel = function() {
        $modalInstance.close('cancel');
    }

    $scope.start = function() {
        $scope.message = 'Ready...';

        $timeout(function() {
            $scope.message = 'Set...';

            $timeout(function() {
                $scope.message = 'Go!';

                $timeout(function() {
                    $modalInstance.close('start');
                }, 1000);
            }, 1000);
        }, 1000);
    }
};

function QuizCtrl($scope, $http, $location, $timeout, $modal, $route) {

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

        var modalInstance = $modal.open({
            templateUrl: 'partial/ready.jade',
            controller: 'ReadyModalCtrl',
            scope: $scope
        });

        modalInstance.result.then(function(reason) {
            if(reason === 'start') {
                $scope.testing = true;

                $timeout(function() {
                    $('.answer').find('input')[0].focus();
                    $scope.startTimer(3.6*$scope.form.problemcount);
                }, 0);
            }
        });

      });
  };

  $scope.checkAnswer = function() {
    angular.forEach($scope.problems, function( problem ){
        if(problem.answer == problem.useranswer) {
            problem.class = 'correct';
            $scope.correct++;
        } else {
            problem.class = 'incorrect';
        }
    });

    var modalInstance = $modal.open({
        templateUrl: 'partial/results.jade',
        controller: 'ResultsModalCtrl',
        scope: $scope
    });
  }

  $scope.startTimer = function(duration) {
    var timer = duration, minutes, seconds;

    var tick = function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $scope.timer = minutes + ":" + seconds;

        if (--timer < 0) {
            $scope.finished = true;
            $scope.checkAnswer();
            return;
        }
        $timeout(tick, 1000);
    }
    tick();
  }

  $scope.newQuiz = function() {
      $route.reload();
  }

}

