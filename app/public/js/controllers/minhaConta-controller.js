angular.module('condominiofacil').controller('MinhaContaController', function( $scope, $rootScope, $http, $ngBootbox, $location) {
	$rootScope.tituloPagina = 'Minha Conta';

	$scope.dadosPessoais = $rootScope.dadosUsuario[0];

	$scope.atualizaDadosPessoais = function(){
		$scope.tratarTelefone();
		$scope.tratarCpf();
		$scope.dadosPessoais.predio = $rootScope.predioUsuario;
		var enviou = false;
		if (!enviou){
			$http({
			   method: 'POST',
			   url: '/moradores',
			   data: $scope.dadosPessoais
			 })
			 .then(function (success) {
			 	enviou = true;
			 	$rootScope.dadosUsuario[0] = $scope.dadosPessoais;
			 	$scope.dadosPessoais = {};
			 	$ngBootbox.alert({message: "Os dados foram atualizados com sucesso", title: "Sucesso!"})
		        .then(function() {
		        	$location.path('/home');
		        });
			   console.log($rootScope.dadosUsuario[0].nomeApelido);

			 }, function(error){
			   $ngBootbox.alert({message: "Ocorreu um Erro! Tente novamente mais tarde!", title: "Ops!"})
		        .then(function() {
		            console.log(error);
		        });
			});
		}
	};

	$scope.tratarCpf = function(){
		var cpf = $scope.dadosPessoais.cpf;
		var retirarPonto = cpf.replace(".", "");
		var retirarPonto2Vezes = retirarPonto.replace(".", "");
		var retirarHifen = retirarPonto2Vezes.replace("-","");
		$scope.dadosPessoais.cpf = retirarHifen;
	}

	$scope.tratarTelefone = function(){
		var telefone = $scope.dadosPessoais.telefone;
		var retirarAbreParenteses = telefone.replace("(", "");
		var retirarFechaParenteses = retirarAbreParenteses.replace(")", "");
		var retirarEspaco = retirarFechaParenteses.replace(" ", "");
		var retirarHifen = retirarEspaco.replace("-","");
		$scope.dadosPessoais.telefone = retirarHifen;
	}

});