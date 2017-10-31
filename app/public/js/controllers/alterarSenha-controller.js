angular.module('condominiofacil').controller('AlterarSenhaController', function(  $scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter, $mdDialog) {
	$rootScope.tituloPagina = 'Alterar Senha';
	$scope.mensagem = '';
	$scope.senhaIrregular = '';
	$scope.usuarioLogado = {};

	$scope.alterarSenha = function(){
		if ( $scope.usuarioLogado.senhaNova != $scope.usuarioLogado.senhaNovaRepetida ){
			$scope.senhaIrregular = "Por favor, confira a senha nova digitada!";
		}else{
			$scope.senhaIrregular = '';
			$scope.usuarioLogado.loginId = $rootScope.idLogin;
			$http({
			   method: 'POST',
			   url: '/alterarSenha',
			   data: $scope.usuarioLogado
			 })
			 .then(function (success) {
			 	console.log(success);
			  	if (success.data.affectedRows == 1){
			  	  $scope.mensagem= 'Senha Alterada com sucesso!';
			  	}else{
			   	  $scope.senhaIrregular = 'A Senha atual digitada não confere. Favor verificar!';
			  	}
			  	$location.path('principal');
			 }, function(error){
			 	$scope.senhaIrregular = 'Não Foi possível alterar agora, tente novamente mais tarde!';
			});
		};
	};


});