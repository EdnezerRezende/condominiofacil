angular.module('condominiofacil').controller('HomeController', function(  $scope, $rootScope, $stateParams, $window, $http, $location, moment) {
	$rootScope.tituloPagina = 'Home';

	
    $scope.agenda = {
      date: 2017-09-15,
      text: 'Algo'
    }

    $location.path('/propagandas');      
    


});