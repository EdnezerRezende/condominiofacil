angular.module('condominiofacil').controller('BoletosController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {
	$rootScope.tituloPagina = 'Boletos';
	$rootScope.rotaBoleto = true;
	$scope.boletosTodos = [];
	$scope.mensagemSucessoBoleto = '';

	$http({
	   method: 'GET',
	   url: '/boletos/' + $rootScope.idLogin 
	 })
	 .then(function (success) {
	   $rootScope.boletos = success.data;
	   $location.path('/boletos'); 
	 }, function(error){
	   console.log(error);
	});

	$http({
	   method: 'GET',
	   url: '/boletos/buscarTodos/' + $rootScope.idLogin 
	 })
	 .then(function (success) {
	   $scope.boletosTodos = success.data;
	 }, function(error){
	   console.log(error);
	});

	 $scope.data = new Date();
   	 $scope.dataFormatada = $filter('date')($scope.data , 'yyyyMMdd');

	 $scope.verificarAtraso = function(item){
	 	var itemData = $filter('date')(item.dataPagamento , 'yyyyMMdd');
	 	if(itemData < $scope.dataFormatada){
	 		console.log("atraso: " + itemData);
	 		console.log("\n");
	 	}
	 }


	 $scope.baixarBoleto = function(item){
	 	item.boletoPago = 1;
	 	
	 	$http({
		   method: 'POST',
		   url: '/boletos/atualizar',
		   data: item
		 })
		 .then(function (success) {
		   var indice = $scope.boletosTodos.indexOf(item);
		   $scope.boletosTodos.splice(indice, 1);
		   $scope.mensagemSucessoBoleto = 'Conta do apartamento ' + item.numeroApt + ' atualizado com sucesso!';
		 }, function(error){
		   console.log(error);
		});
	 }
});