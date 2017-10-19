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
			break;
		case 2:
			break;
		case 3: 
			break;
		case 4:
			var convValorString = item.valor.toString();
			var guardaVlrAntesPonto = convValorString.substr(0, convValorString.indexOf('.'));
			//var convVirgulaPonto = convValorString.replace(",", ".");
			//var tratarDecimal = convVirgulaPonto.substr(0, convVirgulaPonto.indexOf('.'));
			var guardaVlrDepoisPonto = convValorString.substr(convValorString.indexOf('.')+1, convValorString.indexOf(','));
			//var tratarAposPonto = convValorString.substr(convValorString.indexOf('.')+1, 2);
			var guardaVlrDecimal = convValorString.substr(convValorString.indexOf(',')+1, 2);
			//var valorAcertado = tratarDecimal + '.'+ tratarAposPonto;
			var valorAcertado = '';
			if ( guardaVlrAntesPonto.length ){
				valorAcertado += guardaVlrAntesPonto + '.';
			}
			valorAcertado += guardaVlrDepoisPonto + ',' + guardaVlrDecimal;
			
			$scope.valor = parseFloat(valorAcertado);
			//$scope.valor = convValorString;
			console.log("Valor Inserido: "+$scope.valor);
			$scope.conta = item;
			$scope.removerItem( item,aba );
			break;
	}
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
		console.log("Data Pagamento: "+$scope.conta.dataPagamento);
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
			console.log($scope.valor);
			var convValorString = $scope.valor.toString();
			var replac = convValorString.replace(".", "");
			var tratarValor = replac.substr( 0, replac.indexOf(',') );
			tratarValor += ".";
			tratarValor += replac.substr( replac.indexOf(',') + 1, 2 );
			$scope.conta.valor = parseFloat(tratarValor);
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