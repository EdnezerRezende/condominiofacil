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

    app.post('/moradores/administrador/:predio', function(req, res) {
        var predio = req.params.predio;
        
        var connection = app.infra.connectionFactory();
        
        var moradoresDAO = new app.infra.MoradoresDAO(connection);
        moradoresDAO.listaMoradoresAdministradorPredio(predio, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
        connection.end();
    });

    app.post('/moradores/inativarAtivar/:moradorId/:flagAtivaDesativa', function(req, res) {
        var moradorId = req.params.moradorId;
        var ativarDesativar = req.params.flagAtivaDesativa;
        
        var connection = app.infra.connectionFactory();
        
        var moradoresDAO = new app.infra.MoradoresDAO(connection);
        moradoresDAO.ativarDesativarMoradorPredio([moradorId, ativarDesativar], function(err, results) {
            if(err) throw err;
            console.log(results);
            res.json(results);
        });
 
        connection.end();
    });

    app.post('/moradores/1/2', function(req, res) {
        var dadosUsuario = [];
        //for (var i = 0; i < req.body.length; i++) {
        dadosUsuario.push(req.body);
        //}
        count = 0;
        for (var i = 0; i < dadosUsuario.length; i++) {

            count++;
            var connection = app.infra.connectionFactory();
            var loginDAO = new app.infra.LoginDAO(connection);
            var dadosMorador = dadosUsuario[i];
            var guardaResult = '';

            loginDAO.inserirLogin(dadosMorador, function(err, resultLogin){
                if(err){ 
                    throw err;
                }

                var id = resultLogin.insertId;
                var dadosMoradorIDLogin = dadosMorador;
                dadosMoradorIDLogin.loginId = id;

                //preparar para inserir apartamento
                var connection = app.infra.connectionFactory();

                var apartamentoDAO = new app.infra.ApartamentoDAO(connection);

                apartamentoDAO.inserirApartamento(dadosMoradorIDLogin, function(err, resultApartamento) {
                    if(err) { 
                        throw err;
                    }
                    var apartamentoId = resultApartamento.insertId;
                    var dadosMoradorIDApartamento = dadosMorador;
                    dadosMoradorIDApartamento.apartamentoId = apartamentoId;
                    
                    //Preparar para inserir os dados do morador.
                    var connection = app.infra.connectionFactory();
                
                    var moradoresDAO = new app.infra.MoradoresDAO(connection);

                    moradoresDAO.inserirDadosUsuario(dadosMoradorIDApartamento, function(err, results) {
                        if(err) { 
                            throw err;
                        }
                        guardaResult = results;
                    });//Fim do inserir dados do usuario na Moradores
                    //connection.end();
                });//Fim do inserir apartamento
                //connection.end();
            });//Fim do inserir Login
            connection.end();
            res.json(guardaResult);
        };//fim do FOR
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