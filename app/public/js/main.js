angular.module('condominiofacil', ['ui.router', 'angular-mandrill', 'angularMoment', 'ngBootbox', 'ngMaterial', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, MandrillProvider){


	MandrillProvider.setApiKey('Uvr2MvNa1AJY7vG15BnNIQ');

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/home');

	$httpProvider.interceptors.push('tokenInterceptor');

	$stateProvider
	  .state('home', {
	    url: "/home",
	    templateUrl: 'index.html',
	    controller: 'HomeController'
	  })

	   .state('login', {
	    url: "/login",
	    templateUrl: 'parciais/login.html',
	    controller: 'LoginController'
	  })

	   .state('propagandas', {
	    url: "/propagandas",
	    templateUrl: 'parciais/propagandas.html',
	    controller: 'PropagandasController'
	  })
	   //conterá Disponibilização das  contas em aberto, pagas e Pagamento de Contas(Futuramente)
	  .state('boletos', {
	    url: "/boletos",
	    templateUrl: 'parciais/boletos.html',
	    controller: 'BoletosController'
	  })
	    .state('contato', {
	    url: "/contato",
	    templateUrl: 'parciais/contato.html',
	    controller: 'ContatoController'
	  })
  // Página ativada quando logar (conterá Disponibilização das contas Mensais, contas em aberto e Pagamento de Contas)
	  .state('principal', {
	    url: "/principal",
	    templateUrl: 'parciais/principal.html',
	    controller: 'PrincipalController'
	  });
})
.run(['$rootScope', '$window', '$state', 'amMoment', '$location', '$http', '$ngBootbox', 
	function($rootScope, $window, $state, amMoment, $location, $http, $ngBootbox){

	amMoment.changeLocale('pt-br');

	$rootScope.tituloPagina = '';
	$rootScope.loginEfetuado = 'false';
	$rootScope.logado = false;
	$rootScope.rotaBoleto = false;
	$rootScope.usuario = {};
	$rootScope.boletos = [];

	$rootScope.idLogin = '';

	$rootScope.eventos =[];

	$rootScope.goBack = function(){
      $rootScope.detalharCardapio.observacao = "";
      $rootScope.detalharCardapio.quantidade = 1;
      $rootScope.detalharCardapio.restricao = "";
      $window.history.back();
    };

    $rootScope.voltarHome = function(){
		$location.path('/home');	
	}

    $rootScope.fecharMenu = function (){
       var navMain = $("#menu");
       navMain.on("click", "a", null, function () {
           navMain.collapse('hide');
           javascript:void(0);
       });
    };

    $rootScope.cancelar = function(){
    	delete $window.sessionStorage.token;
    	$rootScope.rotaBoleto = false;
    	$rootScope.usuario = {};
		$rootScope.boletos = [];
    	$rootScope.logado = false;
    	$location.path("/home");
    }


    $rootScope.alterarFlag = function(){
    	if($rootScope.logado){
    		$location.path('/boletos');
    	}else{
	    	$rootScope.rotaBoleto = true;
	    	$location.path('/login');
    		
    	}
    };


}]);