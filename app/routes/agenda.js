module.exports = function(app) {  
    app.get('/agenda/:predio', function(req, res) {
        var connection = app.infra.connectionFactory();
        
        var predio = req.params.predio;
        console.log(predio);
        var agendaDAO = new app.infra.AgendaDAO(connection);
        agendaDAO.lista(predio, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

    app.post('/agenda', function(req, res) {
    	var eventosAgenda = [];
    	for (var i = req.body.length - 1; i >= 0; i--) {
    		eventosAgenda.push(req.body[i]);
    	}
        var connection = app.infra.connectionFactory();

        var agendaDAO = new app.infra.AgendaDAO(connection);
        agendaDAO.salvaLista(eventosAgenda, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

     app.delete('/agenda/:racionamentoId', function(req, res) {
        var id = req.params.racionamentoId;
        console.log(id);
        var connection = app.infra.connectionFactory();

        var agendaDAO = new app.infra.AgendaDAO(connection);
        agendaDAO.deletaItem(id, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

  
}