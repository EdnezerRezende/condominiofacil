var jwt  = require('jsonwebtoken'); 

module.exports = function(app) {  
    //Autenticação de usuário
    app.post('/autenticar', function(req,res) {

    	var usuario = req.body; 

        	var connection = app.infra.connectionFactory();

        	var loginDAO = new app.infra.LoginDAO(connection);

        	 loginDAO.findOne(usuario, function(err, results) {
                if (err) throw err;
            	if (results == '') {
                     console.log('Login/senha inválidos');
                     res.sendStatus(401);
                 } else {
                     var token = jwt.sign({login: usuario.login}, app.get('secret'), {
                         expiresIn: 84600
                     });
                     console.log('Autenticado: token adicionado na resposta');
                     
                     res.set('x-access-token', token); 

                     var identificacao = '';
                     for (var i = 0; i < results.length; i++) {
                         identificacao = results[i];
                     };
                     console.log(identificacao);
                     res.json(identificacao);
                     res.end(); 
                 }
                
            });
            connection.end();
    });

    //Rotas que serão verificadas o Login
    app.use('/*', function(req,res, next) {
    	
         var token = req.headers['x-access-token'];

         if (token) {
             console.log('Token recebido, decodificando');
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });
   
}