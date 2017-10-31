'use strict';

describe('CPF Validator Directive Test', function () {

    beforeEach(module('angularjs-br-directive-validator-cpf'));

    var $compile,
            $rootScope,
            scope,
            elm,
            template;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        elm = angular.element('<form name="sampleForm">' +
                '<input name="cpf" type="text" ng-model="cpf" cpf-validator required placeholder="Please provide stron secret">' +
                '<ul class="error-msgs" ng-messages="sampleForm.cpf.$error">' +
                '<li ng-message="cpfIncomplet">Cpf incorreto</li>' +
                '<li ng-message="cpfInvalid">Cpf invalido</li>' +
                '</ul>' +
                '</form>');
        template = $compile(elm)($rootScope);
        scope.$digest();
    }));

    it('Should input to be 1', function () {
        assert.equal(1, template.find('input').length);
    });
    
    it('Should not show li messages', function () {
        assert.equal(0, template.find('li').length);
    });
    
    it('Should cpf is valid', function () {
        template.find('input').val('11111111111');
        assert.equal(0, template.find('li').length);
    });
           
});