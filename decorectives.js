(function() {
  var module = angular.module('decorectives', []);

  module.controller('HomeCtrl', ['$scope', function($scope) {
    $scope.mobileNumber = '07444111222';
    $scope.pin = '0000';
  }]);

  module.directive('confirmMobileNumber', [function() {
    var resendPin = function() {
          console.log('Resending...');
        },

        confirmMobileNumber = function() {
          console.log('Confirming...');
        };

    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var namespace =
          attrs['confirmMobileNumber'] !== '' ?
            attrs['confirmMobileNumber'] : 'confirmMobileNumber';

        var subScope = scope[namespace] = {};
        subScope.resendPin = resendPin;
        subScope.confirmMobileNumber = confirmMobileNumber;
      }
    };
  }]);

  module.directive('composite', [function() {
    var CompositeCtrl = ['$scope', '$sce', function($scope, $sce) {
      var self = this;

      var __construct = function() {
        self.$scope = $scope.templates = {};
      };

      self.provideTemplate = function(name, compiled) {
        self.$scope[name] = compiled;
      };

      __construct();
    }];

    return {
      restrict: 'A',
      transclude: true,
      controller: CompositeCtrl,
      link: function(scope, elem, attrs) {
        console.log('Linking composite...');
      },

      template: '' +
        '<div ng-transclude></div>' +
        '<div>First: <div template="templates.first"></div></div>' +
        '<div>Second: <div template="templates.second"></div></div>'
    };
  }]);

  module.directive('template', [function() {
    return {
      restrict: 'A',
      scope: {
        template: '='
      },
      link: function(scope, elem, attrs) {
        elem.replaceWith(scope.template);
      }
    };
  }]);

  module.directive('component', [function() {
    return {
      require: '^composite',
      restrict: 'A',
      transclude: true,
      link: function(scope, elem, attrs, composite, transclude) {
        var name = attrs['component'];
        if (name === '') {
          throw new Error('Component name not specified.');
        }

        transclude(function(clone) {
          composite.provideTemplate(name, clone);
        });
      }
    };
  }]);
})();
