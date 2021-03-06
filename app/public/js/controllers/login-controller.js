angular.module('condominiofacil').controller('LoginController', function(  $scope, $rootScope, $stateParams, $window, $http, $location) {
	$rootScope.tituloPagina = 'Login';
	$scope.mensagem = '';
	$rootScope.usuario.login = '';
	$rootScope.usuario.senha = '';

	$rootScope.autenticar = function(){

		$http({
	      method: 'POST',
	      url: '/autenticar', 
	      data: $rootScope.usuario
	    })
	    .then(function (success) {
	    	$rootScope.logado = true;
	    	$rootScope.idLogin = success.data.loginId;
	    	$rootScope.predioUsuario = success.data.predio;
	    	var vlrPerfil = success.data.perfilId;

	    	if ( vlrPerfil == 1 ){
	    		$rootScope.perfilAutorizado = true;
	    	} else {
	    		$rootScope.perfilAutorizado = false;
	    	}
	    	
	    	 $rootScope.buscarDadosUsuario();
	    	 
	    	 $http({
			    method: 'GET',
			    url: '/boletos/' + $rootScope.idLogin 
			  })
			  .then(function (success) {
			    $rootScope.boletos = success.data;
			    if($rootScope.rotaBoleto){
			    	$location.path('/boletos'); 
			    }else{
			    	$location.path('/principal'); 
			    }

			  }, function(error){
			    console.log(error);
			  });
	    	
	    }, function(error){
	      $scope.mensagem = 'Login/Senha incorretos';
	    });
	};

	$scope.cancelar = function(){
		$location.path('home');
	};

});