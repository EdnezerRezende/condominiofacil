angular.module('condominiofacil').controller('FalarSindicoController', function(  $scope, $rootScope, $http, $ngBootbox, $location) {
	$rootScope.tituloPagina = 'Contato Síndico';

	$scope.user = $rootScope.dadosUsuario[0];

	console.log($scope.user); 
	
	$scope.envioContatoSindico = function(){
		$scope.user.comSindico = true;
		$scope.user.loginId = $rootScope.idLogin;
		$scope.user.predio = $rootScope.predioUsuario;

		var email = $scope.user;
		$http({
		   method: 'POST',
		   url: '/contato',
		   data: email
		 })
		 .then(function (success) {
		   $scope.user = {};
		    $ngBootbox.alert({message: "E-mail enviado com sucesso, logo retornarei seu contato, Obrigado!", title: "Sucesso!"})
	        .then(function() {
	            $scope.mensagem = "";
	            $scope.titleMensagem = "";
	            $scope.login = 0;
	            $location.path('/home');
	        });
	       
		 }, function(error){
		   console.log(error);
		});
	}

});