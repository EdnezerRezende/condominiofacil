
module.exports = function(app) {  
    app.get('/apartamento/:idLogin', function(req, res) {

        var idLogin = req.params.idLogin;
        console.log("Na Rota: "+idLogin);
        var connection = app.infra.connectionFactory();

        var apartamentoDAO = new app.infra.ApartamentoDAO(connection);
        apartamentoDAO.lista(idLogin, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });
}