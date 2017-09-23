angular.module('condominiofacil').controller('PrincipalController', function($scope, $rootScope, $stateParams, $window, $http, $location, $ngBootbox, $filter) {
	
  $rootScope.tituloPagina = 'Acompanhamento';

  $scope.movimentacao = [];
  $scope.referencias = [];
  $scope.apartamento = {};
  $rootScope.logado = true;

  $rootScope.apresentarEventoDia = function(evento){
    var nowDate = Date('yyyy/MM/dd HH:mm:ss');
    if(evento.dataProgramada == nowDate){
      $ngBootbox.alert({message: "Hoje é dia de " + evento.descricao + ".", title: "Evento"})
          .then(function() {
              $scope.mensagem = "";
              $scope.titleMensagem = "";
              $scope.login = 0;
          });
    }
  };


	$http({
      method: 'GET',
      url: '/movimentacao'
    })
    .then(function (success) {
      $scope.movimentacao = success.data;
    }, function(error){
      console.log(error);
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