'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('focus', function() {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
        elem.bind('keyup', function(e) {
          var code = e.keyCode || e.which;
          if (code === 13) {
            e.preventDefault();

            var getNextInput = function(thisInput) {
                var column = $(thisInput.parentElement.parentElement.parentElement)
                var nextInput = $(thisInput.parentElement.parentElement).next().find('input');
                    
                while (nextInput.length <= 0) {
                    if(column.index() >= column.siblings().length) {
                        return $('input').first();
                    }
                    column = column.next();
                    nextInput = column.find('input').first();
                }

                return nextInput.first();
            }

            getNextInput(elem[0]).focus();
          }
        });
      }
    }
  });
