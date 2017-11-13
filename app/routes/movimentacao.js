
module.exports = function(app) {  
    app.get('/movimentacao/:predio', function(req, res) {
        var predio = req.params.predio;

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.lista(predio, function(err, results) {
        	if(err) throw err;

        	res.json(results);
        });
    });

     app.post('/movimentacao', function(req, res) {
        var contas = [];
        for (var i = req.body.length - 1; i >= 0; i--) {
            contas.push(req.body[i]);
        }

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.salvaLista(contas, function(err, result) {
            if(err) throw err;
            
            var guardaResultado = '';
            var compararRef = '';

            var moment = require('moment');

            for (var i = contas.length - 1; i >= 0; i--) {
                var referenciaAtual = moment(contas[i].dataPagamento).set('date', 2).format('YYYY-MM-DD HH:mm:ss');
                if (compararRef != referenciaAtual || compararRef == '' ){
                    compararRef = referenciaAtual;
                    var predio = contas[i].predio;

                    var values = 
                    {
                        referenciaAtual: referenciaAtual,
                        predio: predio
                    };

                    var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
                    movimentacaoDAO.inserirReferencia(values, function(err, results) {
                        if(err) throw err;
                        guardaResultado = results;
                    })
                }
            };
            res.json(guardaResultado);

        });
 
    });

    app.get('/vlrEntrada/:predio', function(req, res) {
        var predio = req.params.predio;

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.listaVlrEntrada(predio, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

    app.get('/vlrSaida/:predio', function(req, res) {
        var predio = req.params.predio;

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.listaVlrSaida(predio, function(err, results) {
            if(err) throw err;
            res.json(results);
        });
 
    });

     app.get('/movimentacao/referencias/:predio', function(req, res) {
        var predio = req.params.predio;
        
        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.listaReferencia(predio, function(err, results) {
        	if(err) throw err;
        	res.json(results);
        });
 
    });

    app.delete('/movimentacao/:movimentoId/:referencia/:predio', function(req, res) {
        var id = req.params.movimentoId;
        var predio = req.params.predio;
        var referencia = req.params.referencia;
        
        
        var moment = require('moment');

        var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
        movimentacaoDAO.deletaItem(id, function(err, results) {
            if(err) throw err;
            
            var referenciaAtual = moment(referencia).set('date', 2).format('YYYY-MM-DD HH:mm:ss');
            
            var values = {
                referenciaAtual,
                predio
            };
            
            var movimentacaoDAO = new app.infra.MovimentacaoDAO(app);
            movimentacaoDAO.deletaReferencia(values, function(err, results) {
                if(err) throw err;
                res.json(results);

            })

        });
 
    });

}