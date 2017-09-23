angular.module('condominiofacil').controller('BoletosController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {
	$rootScope.tituloPagina = 'Boletos';
	$rootScope.rotaBoleto = true;
	$http({
	   method: 'GET',
	   url: '/boletos/' + $rootScope.idLogin 
	 })
	 .then(function (success) {
	   $rootScope.boletos = success.data;
	   console.log("Pagina Boletos: "+$rootScope.boletos);
	   $location.path('/boletos'); 
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
});