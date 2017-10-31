module.exports = function(app) {  
    var moment = require('moment');

    app.get('/boletos/:idLogin', function(req, res) {

    	var idLogin = req.params.idLogin;
        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.lista(idLogin, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
        connection.end();
    });

    app.get('/boletos/buscarTodos/:idLogin', function(req, res) {

        var idLogin = req.params.idLogin;
        console.log("idLogin: "+ idLogin);
        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.listaTodos(idLogin, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

     app.post('/boletos', function(req, res) {
        var boletos = [];
        for (var i = req.body.length - 1; i >= 0; i--) {
            req.body[i].referencia = moment(req.body[i].dataPagamento).set('date', 1).format('YYYY-MM-DD ');
            req.body[i].dataPagamento = moment(req.body[i].dataPagamento).format('YYYY-MM-DD ');
            boletos.push(req.body[i]);
        }

        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.salvaLista(boletos, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

    app.post('/boletos/atualizar', function(req, res) {
        var boletosAtualizar = req.body;

        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.atualizarBoletos(boletosAtualizar, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

    app.delete('/boletos/:id', function(req, res) {
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();

        var boletosDAO = new app.infra.BoletosDAO(connection);
        boletosDAO.deletarBoletoPorId(id, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

  
} 