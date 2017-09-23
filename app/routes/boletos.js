module.exports = function(app) {  
    app.get('/boletos/:idLogin', function(req, res) {

    	var idLogin = req.params.idLogin;
        console.log(idLogin);
        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.lista(idLogin, function(err, results) {
        	if(err) throw err;
            console.log(results);
        	res.json(results);
        });
 
        connection.end();
    });

  
}