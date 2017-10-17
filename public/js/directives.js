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
            if(elem[0].parentElement.parentElement.nextElementSibling == null) {
                if(elem[0].parentElement.parentElement.parentElement.nextElementSibling == null) {
                    document.querySelector('[name=problems]').querySelectorAll('input')[0].focus();
                } else {
                    elem[0].parentElement.parentElement.parentElement.nextElementSibling.querySelector('input').focus();
                }
            } else {
                elem[0].parentElement.parentElement.nextElementSibling.querySelector('input').focus();
            }
          }
        });
      }
    }
  });
