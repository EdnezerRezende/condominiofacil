
module.exports = function(app) {  
    app.post('/predio/:predio', function(req, res) {

        var predio = req.params.predio;
        var connection = app.infra.connectionFactory();

        var predioDAO = new app.infra.PredioDAO(connection);
        predioDAO.lista(predio, function(err, results) {
        	if(err) throw err;
            console.log(results);
        	res.json(results);
        });
 
        connection.end();
    });
  
}