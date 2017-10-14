angular.module('condominiofacil').controller('CadastramentoController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {

$rootScope.tituloPagina = 'Administrativo';


	
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

$scope.removerItem = function ( item ) {
	console.log(item);
	var indice = $scope.eventos.indexOf( item );
			$scope.eventos.splice(indice, 1);
			console.log('Item removido com sucesso!');
}

$scope.removerTodos = function() {
	$scope.eventos = [];
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

});