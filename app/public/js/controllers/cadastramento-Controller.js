angular.module('condominiofacil').controller('CadastramentoController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {

$rootScope.tituloPagina = 'Administrativo';

//Comum a todas abas

$scope.removerItem = function ( item, aba ) {
	switch(aba){
		case 1: 
			var indice = $scope.eventos.indexOf( item );
					$scope.eventos.splice(indice, 1);
			break;
		case 2: 
			break;
		case 3:
			break;
		case 4: 
			var indice = $scope.contas.indexOf( item );
					$scope.contas.splice(indice, 1);
			break;
	}
}

$scope.removerTodos = function(aba) {
	switch(aba){
		case 1:
			$scope.eventos = [];
			break;
		case 2:
			break;
		case 3: 
			break;
		case 4:
			$scope.contas = [];
			break;
	}
}

$scope.alterarItem = function(item, aba){
	switch(aba){
		case 1:
			$scope.evento = item;
			break;
		case 2:
			break;
		case 3: 
			break;
		case 4:
			console.log(item.valor);
			$scope.valor = item.valor;
			$scope.conta = item;
			break;
	}
	$scope.removerItem( item,aba );
}


//Variáveis/Funções para a Tab Agenda
	
$scope.evento = {};
$scope.eventos = [];
$scope.mostraErro = false;
$scope.mensagemSucesso = '';

$scope.inserirEventoCadastro = function(){
	$scope.mostraErro = false;
	if ( $scope.evento.data != null && $scope.evento.data != "" ) {
		var jaInserido = false;

		//Verificar se já tem registro inserido igual ao que está sendo enviado!
		for (var i = 0; i < $scope.eventos.length; i++) {
			if ( $scope.evento.data.getDate() == $scope.eventos[i].data.getDate() 
				&& $scope.eventos[i].descricao == $scope.evento.descricao ){
				jaInserido = true;
				break;
			} 
		}

		//Caso o item já tenha sido inserido, ele emite mensagem dizendo que já tem registro inserido
		if ( jaInserido ){
	        $scope.mostraErro = true;
			jaInserido = false;
		}else{
			$scope.eventos.push($scope.evento);
		}
		
		$scope.evento = {};
	}
}

$scope.salvarRegistros = function(){
	if ($scope.eventos.length){
		console.log($scope.eventos);
		$http({
	      method: 'POST',
	      url: '/agenda',
	      data: $scope.eventos
	    })
	    .then(function ( success ) {
	      $scope.mensagemSucesso = "Os eventos foram cadastrados com sucesso!";
	      $scope.eventos = [];
	    }, function( error ){
	      console.log( error );
	    });
	}
}

$('#alerta').on('closed.bs.alert', function () {

})
// Fim da Tab Agenda

// Inicio da TAB Despesas


$scope.conta = {};
$scope.contas = [];
$scope.valor = '';

$scope.inserirContas = function(){
	$scope.mostraErro = false;

	if ( $scope.conta != null && $scope.conta.dataPagamento != null ) {
		var jaInserido = false;

		//Verificar se já tem registro inserido igual ao que está sendo enviado!
		for (var i = 0; i < $scope.contas.length; i++) {
			var dataAInserir = new Date($scope.conta.dataPagamento);
			var dataJaInserida = new Date($scope.contas[i].dataPagamento);
			if ( dataAInserir.getDate() == dataJaInserida.getDate() 
				&& $scope.contas[i].descricaoDespesa == $scope.conta.descricaoDespesa ){
				jaInserido = true;
				break;
			} 
		}
		//Caso o item já tenha sido inserido, ele emite mensagem dizendo que já tem registro inserido
		if ( jaInserido ){
	        $scope.mostraErro = true;
			jaInserido = false;
		}else{
			var countPonto = 0;
			var temVirgula = false;
			for (var i = 0; i < $scope.valor.length; i++) {
				if ( $scope.valor[i] == '.' ){
					countPonto++;
				}
				if ( $scope.valor[i] == ',' ) {
					temVirgula = true;
				}
			}
			var replac = $scope.valor;
			if ( countPonto == 1 && temVirgula ) {
				replac = $scope.valor.replace(".", "");
			} 

			var tirarInverterVirgulaParaPonto = replac.replace(",", ".");
			$scope.conta.valor = tirarInverterVirgulaParaPonto;

			if ( $scope.conta.descricaoDespesaDetalhar != null && $scope.conta.descricaoDespesaDetalhar != '' ){
				$scope.conta.descricaoDespesa = $scope.conta.descricaoDespesaDetalhar;
			}
			$scope.conta.loginId = $rootScope.idLogin;
			$scope.contas.push($scope.conta);
		}
		$scope.valor = '';
		$scope.conta = {};
	}
}

$scope.salvarRegistrosDespesas = function(){
	if ($scope.contas.length){
		$http({
	      method: 'POST',
	      url: '/movimentacao',
	      data: $scope.contas
	    })
	    .then(function ( success ) {
	      $scope.mensagemSucesso = "As Contas foram cadastrados com sucesso!";
	      $scope.contas = [];
	    }, function( error ){
	      console.log( error );
	    });
	}
}

//Fim da TAB Despesas

});