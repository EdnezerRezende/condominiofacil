angular.module('condominiofacil').controller('HomeController', function(  $scope, $rootScope, $stateParams, $window, $http, $location, moment) {
	$rootScope.tituloPagina = 'Home';


    $location.path('/propagandas');      
    

});