
module.exports = function(app) {  
    app.get('/movimentacao', function(req, res) {
        var connection = app.infra.connectionFactory();

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
        movimentacaoDAO.lista(function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

     app.post('/movimentacao', function(req, res) {
        var contas = [];
        for (var i = req.body.length - 1; i >= 0; i--) {
            contas.push(req.body[i]);
        }

        var connection = app.infra.connectionFactory();

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
        movimentacaoDAO.salvaLista(contas, function(err, result) {
            if(err) throw err;
            
            var guardaResultado = '';
            var compararRef = '';

            var moment = require('moment');

            for (var i = contas.length - 1; i >= 0; i--) {
                var referenciaAtual = moment(contas[i].dataPagamento).set('date', 1).format('YYYY-MM-DD ');
                if (compararRef != referenciaAtual || compararRef == '' ){
                    compararRef = referenciaAtual;
                    
                    var connection = app.infra.connectionFactory();

                    var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
                    movimentacaoDAO.inserirReferencia(referenciaAtual, function(err, results) {
                        if(err) throw err;
                        guardaResultado = results;
                    })
                }
            };
            res.json(guardaResultado);

        });
 
        connection.end();
    });

    app.get('/vlrEntrada', function(req, res) {
        var connection = app.infra.connectionFactory();

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
        movimentacaoDAO.listaVlrEntrada(function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

    app.get('/vlrSaida', function(req, res) {
        var connection = app.infra.connectionFactory();

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
        movimentacaoDAO.listaVlrSaida(function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

     app.get('/movimentacao/referencias', function(req, res) {
        var connection = app.infra.connectionFactory();

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(connection);
        movimentacaoDAO.listaReferencia(function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });



}