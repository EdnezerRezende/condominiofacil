
module.exports = function(app) {  
    app.get('/apartamento/:idLogin', function(req, res) {

        var idLogin = req.params.idLogin;

        var apartamentoDAO = new app.infra.ApartamentoDAO(app);
        apartamentoDAO.lista(idLogin, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
    });

    app.get('/apartamentos/recuperaTudo/:predio', function(req, res) {
        var predio = req.params.predio;

        var apartamentoDAO = new app.infra.ApartamentoDAO(app);
        apartamentoDAO.listaCompleta(predio, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });    
}