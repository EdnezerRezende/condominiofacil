 var app = require('./config/express')();
 var http = require('http').Server(app);
 
 


 /*https.createServer(httpsOptions, app)
        .listen(port, function() {
            console.log('Servidor ${directoryToServe}/ no endereço https://localhost:${port} ' )
        })*/
var porta = process.env.PORT || 3000;

app.listen(porta, function() {
    console.log("Aplicação Condominio Rodando" );
})
