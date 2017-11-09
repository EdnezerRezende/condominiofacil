module.exports = function(app) {  
	var schedule = require('node-schedule');
	var moment = require('moment');

							//    mm HH D M Semana
	var j = schedule.scheduleJob('50 23 * * *', function(){
		eventosPassados();
	});

	//Método para Deletar eventos já passados
	eventosPassados = function(){
		var eventos = [];

        var agendaDAO = new app.infra.AgendaDAO(app);
        
        agendaDAO.listaTudo( function(err, results) {
        	if(err) throw err;
        	eventos = results;
        	
        	for (var i = 0; i < eventos.length; i++) {
        		atualizaDadosEvento(eventos[i]);
        	}

        });
 

	};


	atualizaDadosEvento = function(evento){
		
		console.log("Entrei no metodo");
		console.log(evento);
		var dataHoje = moment().format('YYYY-MM-DD ');
		console.log(dataHoje);
		var dataEvento = moment(evento.dataProgramada).add(3, 'days').format('YYYY-MM-DD ');
		if ( dataHoje > dataEvento ){

        	var agendaDAO = new app.infra.AgendaDAO(app);

			agendaDAO.deletaEventoPassado(evento.racionamentoId, function(err, results) {
	            if(err) throw err;
	       
	            console.log("Deletou o evento: "+ evento.descricao);
	        });
			
			
		}
	}
}