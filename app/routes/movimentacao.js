
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