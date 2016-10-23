var appDirective = angular.module('appDirective', []);

appDirective.directive('numberOnly', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = Number.parseFloat(text);

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return 0;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
