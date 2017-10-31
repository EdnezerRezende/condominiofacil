var app = angular.module('angularjs-br-directive-validator-cpf',['ngMessages']).directive('cpfValidator', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            
            function customValidator(ngModelValue) {
                function getFirstDigit(v) {
                    var matriz = [10, 9, 8, 7, 6, 5, 4, 3, 2];
                    var total = 0,
                        verifc;
                    for (var i = 0; i < 9; i++) {
                        total += v[i] * matriz[i];
                    }
                    verifc = ((total % 11) < 2) ? 0 : (11 - (total % 11));
                    return verifc;
                }
                
                function getSecondDigit(v) {
                    var matriz = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
                    var total = 0,
                        verifc;
                    for (var i = 0; i < 10; i++) {
                        total += v[i] * matriz[i];
                    }
                    verifc = ((total % 11) < 2) ? 0 : (11 - (total % 11));
                    return verifc;
                }
                
                if (ngModelValue.length >= 11) {
                    ctrl.$setValidity('cpfIncomplet', true);
                    var digits = ngModelValue.replace(/\D+/g, '');
                    var dig1 = getFirstDigit(digits.substr(0, 9));                    
                    var dig2 = getSecondDigit(digits.substr(0, 10));
                    var final = digits.substr(9,2);
                    var val = ""+dig1+dig2;
                    if (final === val) {
                        ctrl.$setValidity('cpfInvalid', true);
                    }
                    else
                    {
                        ctrl.$setValidity('cpfInvalid', false);
                    }
                } else {
                    ctrl.$setValidity('cpfIncomplet', false);                    
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
});