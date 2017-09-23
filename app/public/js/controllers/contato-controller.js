angular.module('condominiofacil').controller('ContatoController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox) {
	$rootScope.tituloPagina = 'Contato';
	$scope.user = {};
	$scope.enviarEmail = function(){
		var email = $scope.user;
		$http({
		   method: 'POST',
		   url: '/contato',
		   data: email
		 })
		 .then(function (success) {
		   $scope.user = {};
		    $ngBootbox.alert({message: "E-mail enviado com sucesso, logo retornaremos seu contato, Obrigado!", title: "Contas Em Aberto"})
	        .then(function() {
	            $scope.mensagem = "";
	            $scope.titleMensagem = "";
	            $scope.login = 0;
	        });
		   $location.path('/contato'); 
		 }, function(error){
		   console.log(error);
		});

		
	};

	

});