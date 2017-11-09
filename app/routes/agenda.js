module.exports = function(app) {  
    app.get('/agenda/:predio', function(req, res) {
        
        var predio = req.params.predio;

        var agendaDAO = new app.infra.AgendaDAO(app);
        agendaDAO.lista(predio, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
    });

    app.post('/agenda', function(req, res) {
    	var eventosAgenda = [];
    	for (var i = req.body.length - 1; i >= 0; i--) {
    		eventosAgenda.push(req.body[i]);
    	}

        var agendaDAO = new app.infra.AgendaDAO(app);
        agendaDAO.salvaLista(eventosAgenda, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
    });

     app.delete('/agenda/:racionamentoId', function(req, res) {
        var id = req.params.racionamentoId;

        var agendaDAO = new app.infra.AgendaDAO(app);
        agendaDAO.deletaItem(id, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

  
}