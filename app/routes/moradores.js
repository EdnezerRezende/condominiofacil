module.exports = function(app) {  

    app.post('/moradores/:predio', function(req, res) {
        var predio = req.params.predio;
        
        var connection = app.infra.connectionFactory();
        
        var moradoresDAO = new app.infra.MoradoresDAO(connection);
        moradoresDAO.listaMoradoresPredio(predio, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

    app.post('/moradores', function(req, res) {
        console.log("aqui");
        var dadosUsuario = req.body;
        
        var connection = app.infra.connectionFactory();
        
        var moradoresDAO = new app.infra.MoradoresDAO(connection);
        moradoresDAO.atualizarDadosUsuario(dadosUsuario, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

    app.post('/moradores/idLogin/:idLogin', function(req, res) {
        var idLogin = req.params.idLogin;
        
        var connection = app.infra.connectionFactory();
        
        var moradoresDAO = new app.infra.MoradoresDAO(connection);
        moradoresDAO.listaMoradorPorIdPredio(idLogin, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

  
}