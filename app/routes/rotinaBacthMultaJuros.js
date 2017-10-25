module.exports = function(app) {  
	var schedule = require('node-schedule');
	var moment = require('moment');

							//    ss mm HH D M Semana
	var j = schedule.scheduleJob('50 59 23 * * *', function(){
		multaJuros();
	});

	//Método para calcular multa e juros diário
	multaJuros = function(){
		var boletos = [];

        var connection = app.infra.connectionFactory();
        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.obterTodosBoletos(function(err, results) {
            if(err) throw err;
       
            boletos = results;
	        
	        for (var i = 0; i < boletos.length; i++) {
	        	calcularJuros(boletos[i]);
	        	calcularMulta(boletos[i]);
	        	atualizaDados(boletos[i]);
	        }

        });
        connection.end();

	};

	calcularJuros = function(boleto){
		var taxaJuros = 1;//Isto é um calculo Percentual (1%) para 30 dias Comercial.
		var taxaJurosDia = taxaJuros / 30;//O Mês Comercial é de 30 dias

		var dataAtual = moment().format('YYYY-MM-DD ');
		var dataBoleto = moment(boleto.dataPagamento).add(2, 'days').format('YYYY-MM-DD ');

		if ( dataAtual > dataBoleto ){
			var valor = boleto.valor;
			var diaAtual = moment(dataAtual, "YYYY-MM-DD").date();
			var diaBoleto = moment(dataBoleto, "YYYY-MM-DD").date();
			var diasJuros = diaAtual - diaBoleto;
			var calculoJuros = (valor * ( taxaJurosDia * diasJuros ) )/100;
			boleto.juros = calculoJuros;
		}
	}

	calcularMulta = function(boleto){
		var taxaMulta = 2;
		var dataAtual = moment().format('YYYY-MM-DD ');
		var dataBoleto = moment(boleto.dataPagamento).add(2, 'days').format('YYYY-MM-DD ');

		if ( dataAtual > dataBoleto && boleto.multa == 0 ){
			var valor = boleto.valor;
			var calculoMulta = (valor * taxaMulta)/100;
			boleto.multa = calculoMulta;
			boleto.boletoAtraso = 1;
			boleto.boletoAberto = 1;
		}
	}

	atualizaDados = function(boleto){
		var connection = app.infra.connectionFactory();
        var boletosDAO = new app.infra.BoletosDAO(connection);

		boletosDAO.atualizaMultaJurosBoleto(boleto, function(err, results) {
            if(err) throw err;
       
            console.log("Atualizei multa e Juros do Boleto: "+ boleto.boletoId);
        });
		
		connection.end();
	}
}
