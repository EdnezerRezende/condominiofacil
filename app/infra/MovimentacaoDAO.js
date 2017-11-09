function MovimentacaoDAO(app) {
    this._app = app; 
}
var moment = require('moment');

MovimentacaoDAO.prototype.lista = function( predio, callback) {
    this._app.infra.connectionFactory(function(err, connection) {    
    	var sql = 'select * from movimentacao where predio = ? ';
        connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

MovimentacaoDAO.prototype.salvaLista = function(contas, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
        var values = [];
        
        var sql = 'insert into movimentacao ( descricao, tipoRegistro, valor, dataInserido, loginId, referencia, predio ) VALUES ? ' ;

        for (var i = contas.length - 1; i >= 0; i--) {
            var dataInserido = moment(contas[i].dataPagamento).format('YYYY-MM-DD ');
            var descricao = '';
            var referencia = moment(contas[i].dataPagamento).set('date', 1).format('YYYY-MM-DD ');

            
            if ( contas[i].descricaoDespesa != null && contas[i].descricaoDespesa != '' ){
                descricao = contas[i].descricaoDespesa;
            }else{
                descricao = contas[i].descricaoDespesaDetalhar;
            }

            var tratar = [
                    descricao,
                    contas[i].tipoDespesa,
                    contas[i].valor,
                    dataInserido,
                    contas[i].loginId,
                    referencia,
                    contas[i].predio
            ];

            values.push(tratar);
        }

        connection.query(sql, [values], function(erros, results) {
                connection.release();
                callback(erros,results);
            });
        });
}

MovimentacaoDAO.prototype.listaVlrEntrada = function( predio, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
    	var sql = 'SELECT  mE.referencia, sum(mE.valor) as vlrEntrada FROM movimentacao mE where mE.tipoRegistro = "E" and mE.predio = ? group by mE.referencia ';
        connection.query(sql, [predio],  function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

MovimentacaoDAO.prototype.listaVlrSaida = function( predio, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
    	var sql = 'SELECT  mS.referencia, sum(mS.valor) as vlrSaida FROM movimentacao mS where mS.tipoRegistro = "S" and mS.predio = ? group by mS.referencia ';
        connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });

}

MovimentacaoDAO.prototype.listaReferencia = function(predio, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
    	var sql = 'select * from referencia where predio_id = ? ';
        connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });

}

MovimentacaoDAO.prototype.inserirReferencia = function(values, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
        var referencias = [];
        var tratar = [
            values.referenciaAtual
        ];
        referencias.push(tratar);

        var sql = 'insert into referencia ( referencia, predio_id ) ';
        sql += ' SELECT ?, ? ' ;
        sql += ' FROM DUAL WHERE NOT EXISTS';
        sql += ' (SELECT r.referencia FROM referencia r WHERE r.referencia = ? and r.predio_id = ? order by r.referencia) ';
        connection.query(sql, [referencias, values.predio, referencias, values.predio ], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

MovimentacaoDAO.prototype.deletaItem = function(id, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
        var sql = 'delete from movimentacao where movimentoId = ? ' ;
        connection.query(sql, id, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });

}

//Após deletaItem ser executado, ele fará uma consulta neste método para ver se tem algum registro na tabela 
//movimento e caso não exista, apagará na tabela Referencia.
MovimentacaoDAO.prototype.deletaReferencia = function(values, callback) {
    this._app.infra.connectionFactory(function(err, connection) { 
        var sql = 'delete from referencia  ' ;
        sql += ' where referencia.referencia = ? ';
        sql += '  and (select count(movimentacao.referencia) from movimentacao where movimentacao.referencia = ? and movimentacao.predio = ?) = 0';
        sql += '  and referencia.predio_id = ? ';

        connection.query(sql, [values.referenciaAtual,values.referenciaAtual, values.predio, values.predio ], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return MovimentacaoDAO;
};