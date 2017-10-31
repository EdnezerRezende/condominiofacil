angular.module('condominiofacil').controller('CadastramentoController', function( $scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {

$rootScope.tituloPagina = 'Administrativo';

//Comum a todas abas

$scope.mesReferencia = [
	{
		value: 0,
		descricao: 'Janeiro'
	},
	{
		value: 1,
		descricao: 'Fevereiro'
	},
	{
		value: 2,
		descricao: 'Março'
	},
	{
		value: 3,
		descricao: 'Abril'
	},
	{
		value: 4,
		descricao: 'Maio'
	},
	{
		value: 5,
		descricao: 'Junho'
	},
	{
		value: 6,
		descricao: 'Julho'
	},
	{
		value: 7,
		descricao: 'Agosto'
	},
	{
		value: 8,
		descricao: 'Setembro'
	},
	{
		value: 9,
		descricao: 'Outubro'
	},
	{
		value: 10,
		descricao: 'Novembro'
	},
	{
		value: 11,
		descricao: 'Dezembro'
	}
];

$scope.removerItem = function ( item, aba ) {
	switch(aba){
		case 1: 
			var indice = $scope.eventos.indexOf( item );
			$scope.eventos.splice(indice, 1);
			break;
		case 2: 
			if ( item.boletoId != null ){
				$http({
				   method: 'DELETE',
				   url: '/boletos/' + item.boletoId 
				 })
				 .then(function (success) {
				   var indice = $scope.boletosExistentes.indexOf( item );
				   $scope.boletosExistentes.splice(indice, 1);
				   $scope.mensagemSucesso = 'Boleto do apartamento ' + item.numeroApt + ' foi deletado!';
				 }, function(error){
				   console.log(error);
				});
			}else{
				var indice = $scope.boletos.indexOf( item );
				$scope.boletos.splice(indice, 1);
			}
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
			$scope.boletos = [];
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
			$scope.removerItem( item,aba )
			break;
		case 2:
			if ( $scope.gerarBoletosTodos ){
				$scope.gerarBoletosTodos = false;
			}
			$scope.valorBoleto = item.valorBoleto;
			$scope.boleto = item;
			break;
		case 3: 
			break;
		case 4:
			$scope.valor = item.valor;
			$scope.conta = item;
			$scope.removerItem( item,aba )
			break;
	}
}

$scope.mostraErro = false;

//Variáveis/Funções para a Tab Agenda
	
$scope.evento = {};
$scope.eventos = [];
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
		$scope.evento.predio = $rootScope.predioUsuario;
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

// Inicio da TAB Boletos
$scope.boleto = {};
$scope.boletos = [];
$scope.valorBoleto = '';
$scope.boletoTodos = {};
$scope.gerarBoletosTodos = false;
$scope.boletosExistentes = [];

$scope.apartamentos = [];

$scope.dataInformadaParaAutomaticamente = new Date();

$scope.tratarCampoValorInserir = function(){
	var countPonto = 0;
	var temVirgula = false;
	for (var i = 0; i < $scope.valorBoleto.length; i++) {
		if ( $scope.valorBoleto[i] == '.' ){
			countPonto++;
		}
		if ( $scope.valorBoleto[i] == ',' ) {
			temVirgula = true;
		}
	}
	var replac = $scope.valorBoleto;
	if ( countPonto == 1 && temVirgula ) {
		replac = $scope.valorBoleto.replace(".", "");
	} 

	var tirarInverterVirgulaParaPonto = replac.replace(",", ".");
	$scope.boleto.valorBoleto = tirarInverterVirgulaParaPonto;
}

$http({
  method: 'GET',
  url: '/apartamentos/recuperaTudo/' + $rootScope.predioUsuario
})
.then(function ( success ) {
  $scope.apartamentos = success.data;
}, function( error ){
  console.log( error );
});

$http({
   method: 'GET',
   url: '/boletos/buscarTodos/' + $rootScope.idLogin 
 })
 .then(function (success) {

   $scope.boletosExistentes = success.data;
   console.log($scope.boletosExistentes);
 }, function(error){
   console.log(error);
});

$scope.gerarBoletosAutomaticamente = function(){
	for (var i = 0; i < $scope.apartamentos.length; i++) {
		if ( $scope.boletoTodos.dataPagamento != null ){
			$scope.boleto = {};
			$scope.tratarCampoValorInserir();//Inserir Valor do Boleto

			var mes = $filter('date')($scope.boletoTodos.dataPagamento , 'MM');
		 	$scope.boleto.descricaoBoleto = 'Boleto referente ao Mês de ' + mes;
			$scope.boleto.loginId = $scope.apartamentos[i].loginId;//Inserir O LoginId do responsável do Apartamento
			$scope.boleto.apartamento = $scope.apartamentos[i].apartamentoId;
			$scope.boleto.predio = $rootScope.predioUsuario;
		 	$scope.boleto.dataPagamento = $scope.boletoTodos.dataPagamento;
			$scope.boletos.push($scope.boleto);
		}
	}
	$scope.boleto = {};
	$scope.valorBoleto = '';
	$scope.boletoTodos = {};
} 

	$scope.inserirBoletos = function(){
		$scope.mostraErro = false;

		if ( $scope.boleto != null && $scope.boleto.dataPagamento != null ){
			var jaInserido = false;

			for (var i = 0; i < $scope.boletos.length; i++) {
				var dataAInserir = new Date($scope.boleto.dataPagamento);
				var dataJaInserida = new Date($scope.boletos[i].dataPagamento);
				if ( dataAInserir.getDate() == dataJaInserida.getDate() 
					&& $scope.boletos[i].descricaoBoleto == $scope.boleto.descricaoBoleto
					&& $scope.boletos[i].apartamento == $scope.boleto.apartamento ){
					$scope.removerItem($scope.boletos[i], 2);
					//jaInserido = true;
					break;
				} 
			}

			if ( jaInserido ){
		        $scope.mostraErro = true;
				jaInserido = false;

			}else{
				var countPonto = 0;
				var temVirgula = false;
				for (var i = 0; i < $scope.valorBoleto.length; i++) {
					if ( $scope.valorBoleto[i] == '.' ){
						countPonto++;
					}
					if ( $scope.valorBoleto[i] == ',' ) {
						temVirgula = true;
					}
				}
				var replac = $scope.valorBoleto;
				if ( countPonto == 1 && temVirgula ) {
					replac = $scope.valorBoleto.replace(".", "");
				} 

				var tirarInverterVirgulaParaPonto = replac.replace(",", ".");
				$scope.boleto.valorBoleto = tirarInverterVirgulaParaPonto;
				$scope.boleto.predio = $rootScope.predioUsuario;
				
				for (var i = 0; i < $scope.apartamentos.length; i++) {

					if ( $scope.boleto.apartamento == $scope.apartamentos[i].apartamentoId ){
						$scope.boleto.loginId = $scope.apartamentos[i].loginId;
					}
				}
				$scope.boletos.push($scope.boleto);
			}
			$scope.valorBoleto = '';
			$scope.boleto = {};

		}
	}

	$scope.salvarRegistrosBoletos = function(){
		if ($scope.boletos.length){
			$http({
		      method: 'POST',
		      url: '/boletos',
		      data: $scope.boletos
		    })
		    .then(function ( success ) {
		      $scope.mensagemSucesso = "Os Boletos foram cadastrados com sucesso!";
		      $scope.boletos = [];
		      
		      $http({
			   method: 'GET',
			   url: '/boletos/buscarTodos/' + $rootScope.idLogin 
			  }).then(function (success) {

			   $scope.boletosExistentes = success.data;
			   console.log($scope.boletosExistentes);
			   }, function(error){
			  	 console.log(error);
			   });

		    }, function( error ){
		      console.log( error );
		    });
		}
	}
	
// Fim da Tab Boletos

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
			$scope.conta.predio = $rootScope.predioUsuario;
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