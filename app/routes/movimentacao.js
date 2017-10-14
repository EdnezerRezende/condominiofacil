
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