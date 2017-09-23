module.exports = function(app) {  
    app.get('/agenda', function(req, res) {
        var connection = app.infra.connectionFactory();

        var agendaDAO = new app.infra.AgendaDAO(connection);
        agendaDAO.lista(function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

  
}