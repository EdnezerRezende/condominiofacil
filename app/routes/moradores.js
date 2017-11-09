module.exports = function(app) {  

    app.post('/moradores/:predio', function(req, res) {
        var predio = req.params.predio;
        
        var moradoresDAO = new app.infra.MoradoresDAO(app);
        moradoresDAO.listaMoradoresPredio(predio, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
    });

    app.post('/moradores/administrador/:predio', function(req, res) {
        var predio = req.params.predio;
        
        
        var moradoresDAO = new app.infra.MoradoresDAO(app);
        moradoresDAO.listaMoradoresAdministradorPredio(predio, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

    app.post('/moradores/inativarAtivar/:moradorId/:flagAtivaDesativa', function(req, res) {
        var moradorId = req.params.moradorId;
        var ativarDesativar = req.params.flagAtivaDesativa;
        
        var moradoresDAO = new app.infra.MoradoresDAO(app);
        moradoresDAO.ativarDesativarMoradorPredio([moradorId, ativarDesativar], function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

    app.post('/moradores/1/2', function(req, res) {
        var dadosUsuario = [];
        //for (var i = 0; i < req.body.length; i++) {
        dadosUsuario.push(req.body);
        //}
        count = 0;
        for (var i = 0; i < dadosUsuario.length; i++) {

            count++;

            var loginDAO = new app.infra.LoginDAO(app);
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

                var apartamentoDAO = new app.infra.ApartamentoDAO(app);

                apartamentoDAO.inserirApartamento(dadosMoradorIDLogin, function(err, resultApartamento) {
                    if(err) { 
                        throw err;
                    }
                    var apartamentoId = resultApartamento.insertId;
                    var dadosMoradorIDApartamento = dadosMorador;
                    dadosMoradorIDApartamento.apartamentoId = apartamentoId;
                    
                    //Preparar para inserir os dados do morador.
                    var moradoresDAO = new app.infra.MoradoresDAO(app);

                    moradoresDAO.inserirDadosUsuario(dadosMoradorIDApartamento, function(err, results) {
                        if(err) { 
                            throw err;
                        }
                        guardaResult = results;
                    });//Fim do inserir dados do usuario na Moradores
                });//Fim do inserir apartamento
            });//Fim do inserir Login
            res.json(guardaResult);
        };//fim do FOR
    });

    app.post('/moradores', function(req, res) {
        console.log("aqui");
        var dadosUsuario = req.body;
        
        var moradoresDAO = new app.infra.MoradoresDAO(app);
        moradoresDAO.atualizarDadosUsuario(dadosUsuario, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

    

    
    app.post('/moradores/idLogin/:idLogin', function(req, res) {
        var idLogin = req.params.idLogin;
        
        var moradoresDAO = new app.infra.MoradoresDAO(app);
        moradoresDAO.listaMoradorPorIdPredio(idLogin, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

  
}