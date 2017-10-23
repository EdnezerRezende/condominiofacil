angular.module('condominiofacil').controller('PrincipalController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {
	
  $rootScope.tituloPagina = 'Acompanhamento';
  $scope.now = new Date();
  
  $scope.movimentacao = [];
  $scope.referencias = [];
  $scope.apartamento = {};
  $scope.vlrEntrada = [];
  $scope.vlrSaida = [];
  $scope.permiteExcluir = $rootScope.perfilAutorizado;


  $scope.removerItem = function ( item, aba ) {
    switch(aba){
      case 1: 

        $http({
          method: 'DELETE',
          url: '/agenda/' + item.racionamentoId
        })
        .then(function (success) {
          var indice = $rootScope.eventos.indexOf( item );
          $rootScope.eventos.splice(indice, 1);

        }, function(error){
          console.log(error);
        });
        
        break;
      case 2: 
        var indice = $scope.movimentacao.indexOf( item );
            $scope.movimentacao.splice(indice, 1);
        break;
    }
}

	$http({
      method: 'GET',
      url: '/movimentacao'
    })
    .then(function (success) {
      $scope.movimentacao = success.data;
     
    }, function( error ){
      console.log( error );
    });
 
  $http({
      method: 'GET',
      url: '/vlrEntrada'
    })
    .then(function (success) {
      $scope.vlrEntrada = success.data;
     
    }, function( error ){
      console.log( error );
    });

  $http({
      method: 'GET',
      url: '/vlrSaida'
    })
    .then(function (success) {
      $scope.vlrSaida = success.data;
     
    }, function( error ){
      console.log( error );
    });



    $http({
      method: 'GET',
      url: '/apartamento/' + $rootScope.idLogin 
    })
    .then(function (success) {
       $scope.apartamento = success.data;
    }, function(error){
      console.log(error);
    });

  $http({
    method: 'GET',
    url: '/movimentacao/referencias'
  })
  .then(function (success) {
    $scope.referencias = success.data;
  }, function(error){
    console.log(error);
  });

  $http({
    method: 'GET',
    url: '/agenda'
  })
  .then(function (success) {
    $rootScope.eventos = success.data;
  }, function(error){
    console.log(error);
  });

  $scope.now = new Date();
  $scope.dataFormatada = $filter('date')($scope.now , 'yyyyMMdd');


  $scope.verificaBoletosAtivos = function(){
    for (var i = 0; i < $rootScope.boletos.length; i++) {
      var dataItem = $filter('date')($rootScope.boletos[i].dataPagamento , 'yyyyMMdd');
      if(dataItem < $scope.dataFormatada && $rootScope.boletos[i].boletoPago == 0 ){
       $ngBootbox.alert({message: "Existem Boletos em Atraso, favor verificar no Menu/Boletos", title: "Contas Em Aberto"})
        .then(function() {
            $scope.mensagem = "";
            $scope.titleMensagem = "";
            $scope.login = 0;
        });
       // alert("Existem Boletos em Atraso, favor verificar no Menu/Boletos");
        break;
      }

    }
  };

  

});