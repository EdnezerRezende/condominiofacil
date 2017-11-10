function BoletosDAO(app) {
    this._app = app;
}
    
var moment = require('moment');

BoletosDAO.prototype.lista = function(idLogin, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'select b.loginId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento,  b.totPago, ';
        sql += ' b.dataPago, b.boletoAtraso, b.boletoAberto, apt.numeroApt, apt.apartamentoId ';
        sql += ' from boletos b ';
        sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
        sql += ' where b.loginId = apt.loginId and apt.loginId = ? ';
        
        connection.query(sql, idLogin, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

BoletosDAO.prototype.obterTodosBoletos = function( callback ) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'select b.loginId, b.boletoId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento, b.totPago,  ';
        sql += ' b.dataPago, b.boletoAtraso, b.boletoAberto, b.boletoPago, apt.numeroApt, apt.apartamentoId ';
        sql += ' from boletos b ';
        sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
        sql += ' where b.boletoPago = 0 '

        connection.query(sql, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

BoletosDAO.prototype.atualizaMultaJurosBoleto = function( boleto, callback ) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'update boletos b set b.boletoAtraso = ?, b.boletoAberto = ? , b.multa = ?, b.juros = ? ';
            sql += ' where b.boletoId = ?  ';

        connection.query(sql, [boleto.boletoAtraso, boleto.boletoAberto, boleto.multa, boleto.juros, boleto.boletoId ], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}


BoletosDAO.prototype.listaTodos = function(idLogin, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'select b.boletoId, b.loginId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento, b.totPago,    ';
        sql += ' b.dataPago, b.boletoAtraso, b.descricao, b.boletoAberto, b.boletoPago, apt.numeroApt, apt.apartamentoId ';
        sql += ' from boletos b ';
        sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
        sql += ' inner join predio predio on apt.predio = predio.predioId '
        sql += ' where apt.predio = (select predio from apartamento where loginId = ? ) ';
        sql += ' and b.boletoPago = 0 ';
        
        connection.query(sql, idLogin, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

BoletosDAO.prototype.salvaLista = function(boletos, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var values = [];
        var sql = 'insert into boletos ( referencia, valor, dataPagamento, loginId, numeroApartamento, descricao, boletoPago, predio ) VALUES ? ' ;

        for (var i = boletos.length - 1; i >= 0; i--) {
            var dataVencimento = moment(boletos[i].dataPagamentodevelop).format('YYYY-MM-DD HH:mm:ss');
            console.log("Data Vencimento " + dataVencimento);
            var tratar = [

                    boletos[i].referencia,
                    boletos[i].valorBoleto,
                    dataVencimento,
                    boletos[i].loginId,
                    boletos[i].apartamento,
                    boletos[i].descricaoBoleto,
                    boletos[i].boletoPago = 0,
                    boletos[i].predio

            ];
            
            values.push(tratar);
        }

        connection.query(sql, [values], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

BoletosDAO.prototype.atualizarBoletos = function(boletosAtualizar, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var values = [];
        var dataHoje =  moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = 'update boletos b set b.boletoPago = 1, b.dataPago = ? , b.totPago = ? where b.boletoId = ? ';
        
        var tratar = [
                boletosAtualizar.boletoId
        ];
        
        values.push(tratar);
        connection.query(sql, [dataHoje, boletosAtualizar.totPago, values], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

BoletosDAO.prototype.deletarBoletoPorId = function(id, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'delete from boletos  where boletoId = ? ';
       
        connection.query(sql, [id], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return BoletosDAO;
};