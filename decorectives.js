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
})();
