angular.module('condominiofacil').controller('ContatoController', function(  $scope, $rootScope, $http, $ngBootbox) {
	$rootScope.tituloPagina = 'Contato';
	$scope.user = {};


	$rootScope.envioContato = function(){
		console.log($scope.user);
		var email = $scope.user;
		$http({
		   method: 'POST',
		   url: '/contato',
		   data: email
		 })
		 .then(function (success) {
		   $scope.user = {};
		    $ngBootbox.alert({message: "E-mail enviado com sucesso, logo retornaremos seu contato, Obrigado!", title: "Sucesso!"})
	        .then(function() {
	            $scope.mensagem = "";
	            $scope.titleMensagem = "";
	            $scope.login = 0;
	        });
	       
		 }, function(error){
		   console.log(error);
		});
	}

});