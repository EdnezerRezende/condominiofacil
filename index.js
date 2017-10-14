 var app = require('./config/express')();
 var http = require('http').Server(app);
 
 


 /*https.createServer(httpsOptions, app)
        .listen(port, function() {
            console.log('Servidor ${directoryToServe}/ no endereço https://localhost:${port} ' )
        })*/
app.listen(3000, function() {
    console.log("Aplicação Condominio Rodando" );
})
