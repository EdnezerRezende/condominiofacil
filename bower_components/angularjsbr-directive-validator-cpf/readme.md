CPF Validator Directive [![Build Status](https://travis-ci.org/angularjsbr/directive-validator-cpf.svg?branch=master)](https://travis-ci.org/angularjsbr/directive-validator-cpf)
=======================

Diretiva para validação de cpf em AngularJS.

Para instalar :

```
  bower install angularjs-br-directive-validator-cpf
```

* Coloque a diretiva como dependência do seu projeto

```javascript
  app.module('app',[...,'angularjs-br-directive-validator-cpf'])...
```

```html
  <input type='text' cpf-validator ....>
```

* Um dos requerimentos da diretiva é o angular-messages para lançar na view as mensagens de erro.

```javascript
  app.module('app',[...,'ngMessages','angularjs-br-directive-validator-cpf'])...
```

```html
  <input type='text' cpf-validator ....>
  <ul>
  <li ng-message="cpfInvalid">mnsagem para cpf invalid error</li>
  <li ng-message="cpfIncomplet">mnsagem para cpf incomplet error</li>
  </ul>
```

As mensagens de erros disparadas são:

* cpfIncomplet -> Quando o cpf tem números de caracteres diferente de 11.
* cpfInvalid -> Quando o cpf inserido for inválido.