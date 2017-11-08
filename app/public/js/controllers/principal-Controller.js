angular.module('condominiofacil').controller('PrincipalController', function(  $scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter, $mdDialog) {
	
  $rootScope.tituloPagina = 'Acompanhamento';
  $scope.nowEvento = new Date();
  
  $scope.movimentacao = [];
  $scope.referencias = []; 
  $scope.apartamento = {}; 
  $scope.vlrEntrada = [];
  $scope.vlrSaida = [];
  $scope.permiteExcluir = $rootScope.perfilAutorizado;
  $scope.EmiteMensagemSucesso = "";
  $scope.EmiteMensagemErro = "";
  $scope.eventos =[];
  $rootScope.paginasUsuario = [];

 

  $scope.removerItem = function ( item, aba ) {
    switch(aba){
      case 1: 

        $http({
          method: 'DELETE',
          url: '/agenda/' + item.racionamentoId
        })
        .then(function (success) {
          var indice = $scope.eventos.indexOf( item );
          $scope.eventos.splice(indice, 1);
          $scope.EmiteMensagemSucesso = "O Evento " + item.descricao +  " deletado com sucesso!";

        }, function(error){
          $scope.EmiteMensagemErro = "Não foi possível deletar o evento, tente novamente mais tarde!";
          console.log(error);
        });
        
        break;
      case 2: 
        $http({
          method: 'DELETE',
          url: '/movimentacao/' + item.movimentoId + '/' +item.referencia + '/' + $rootScope.predioUsuario
        })
        .then(function (success) {
          
          var deletouReferencia = success.data.affectedRows;
          
          console.log(success);

          var indice = $scope.movimentacao.indexOf( item );
          $scope.movimentacao.splice(indice, 1);

          if ( item.tipoRegistro == 'E' ){
            for (var i = 0; i < $scope.vlrEntrada.length; i++) {
              var dataEventoFormatada = $filter('date')($scope.vlrEntrada[i].referencia , 'yyyy-MM-dd');
              var dataItemFormatada = $filter('date')(item.referencia , 'yyyy-MM-dd');
              if (dataEventoFormatada == dataItemFormatada) {
                  $scope.vlrEntrada[i].vlrEntrada -= item.valor;
                  break;
              }
            }
          }else{
            for (var i = 0; i < $scope.vlrSaida.length; i++) {
              var dataEventoFormatada = $filter('date')($scope.vlrSaida[i].referencia , 'yyyy-MM-dd');
              var dataItemFormatada = $filter('date')(item.referencia , 'yyyy-MM-dd');
              if (dataEventoFormatada == dataItemFormatada) {
                  $scope.vlrSaida[i].vlrSaida -= item.valor;
                  break;
              }
            }
          }

          if ( deletouReferencia > 0 ){
            var indice = $scope.referencias.indexOf( item.referencia );
            $scope.referencias.splice(indice, 1);
          }
            
          $scope.EmiteMensagemSucesso = "A conta " + item.descricao + " no valor de R$ " +item.valor+ " foi deletada com sucesso!";

        }, function(error){
          $scope.EmiteMensagemErro = "Não foi possível deletar esta conta, tente novamente mais tarde!";
          console.log(error);
        });
        break; 
    }
}

	$http({
      method: 'GET',
      url: '/movimentacao/'+$rootScope.predioUsuario
    })
    .then(function (success) {
      $scope.movimentacao = success.data;
     
    }, function( error ){
      console.log( error );
    });
 
  $http({
      method: 'GET',
      url: '/vlrEntrada/'+ $rootScope.predioUsuario
    })
    .then(function (success) {
      $scope.vlrEntrada = success.data;
     
    }, function( error ){
      console.log( error );
    });

  $http({
      method: 'GET',
      url: '/vlrSaida/'+ $rootScope.predioUsuario
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
    url: '/movimentacao/referencias/'+ $rootScope.predioUsuario
  })
  .then(function (success) {
    console.log(success);
    $scope.referencias = success.data;
  }, function(error){
    console.log(error);
  });

  $http({
    method: 'GET',
    url: '/agenda/'+ $rootScope.predioUsuario
  })
  .then(function (success) {
    $scope.eventos = success.data;
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