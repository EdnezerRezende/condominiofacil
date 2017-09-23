angular.module('condominiofacil').controller('HomeController', function($scope, $rootScope, $stateParams, $window, $http, $location, moment) {
	$rootScope.tituloPagina = 'Home';

	
	$rootScope.fecharMenu = function (){
       var navMain = $("#menu");
       navMain.on("click", "a", null, function () {
           navMain.collapse('hide');
           javascript:void(0);
       });
    };
    $scope.agenda = {
      date: 2017-09-15,
      text: 'Algo'
    }

    $location.path('/propagandas');      
	



});