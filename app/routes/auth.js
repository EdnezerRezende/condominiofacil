var jwt  = require('jsonwebtoken'); 

module.exports = function(app) {  
    //Autenticação de usuário
    app.post('/autenticar', function(req,res) {

    	var usuario = req.body; 

        	var loginDAO = new app.infra.LoginDAO(app);

        	 loginDAO.findOne(usuario, function(err, results) {
                if (err) {console.log("cheguei aqui: "); throw err};
            	if (results == '') {
                     //console.log('Login/senha inválidos');
                     res.sendStatus(401);
                 } else {
                     var token = jwt.sign({login: usuario.login}, app.get('secret'), {
                         expiresIn: 84600
                     });
                     
                     res.set('x-access-token', token); 

                     var identificacao = '';
                     for (var i = 0; i < results.length; i++) {
                         identificacao = results[i];
                     };
                     res.json(identificacao);
                     res.end(); 
                 }
                
            });
    });

    app.post('/alterarSenha', function(req,res) {

        var usuario = req.body;

            var loginDAO = new app.infra.LoginDAO(app);

             loginDAO.alterarSenha(usuario, function(err, results) {
                if (err) throw err;
                res.json(results);
            });
    });





    //Rotas que serão verificadas o Login
    app.use('/agenda*', function(req,res, next) {
    	
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

    app.use('/alterarSenha*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

   app.use('/boletos*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

    app.use('/moradores*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

   app.use('/apartamento*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

      app.use('/movimentacao*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });

    app.use('/vlrSaida*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });
    app.use('/vlrEntrada*', function(req,res, next) {
        
         var token = req.headers['x-access-token'];

         if (token) {
             //'Token recebido, decodificando';
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     //console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     //console.log('Token aceito');
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            //console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    });
}