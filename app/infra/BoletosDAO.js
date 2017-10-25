function BoletosDAO(connection) {
    this._connection = connection;
}
    
var moment = require('moment');

BoletosDAO.prototype.lista = function(idLogin, callback) {
    var sql = 'select b.loginId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento,   ';
    sql += ' b.dataPago, b.boletoAtraso, b.boletoAberto, apt.numeroApt, apt.apartamentoId ';
    sql += ' from boletos b ';
    sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
    sql += ' where b.loginId = apt.loginId and apt.loginId = ? ';
    
    this._connection.query(sql, idLogin, callback);
}

BoletosDAO.prototype.obterTodosBoletos = function( callback ) {
    var sql = 'select b.loginId, b.boletoId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento,   ';
    sql += ' b.dataPago, b.boletoAtraso, b.boletoAberto, b.boletoPago, apt.numeroApt, apt.apartamentoId ';
    sql += ' from boletos b ';
    sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
    sql += ' where b.boletoPago = 0 '

    this._connection.query(sql, callback);
}

BoletosDAO.prototype.atualizaMultaJurosBoleto = function( boleto, callback ) {
   
    var sql = 'update boletos b set b.boletoAtraso = ?, b.boletoAberto = ? , b.multa = ?, b.juros = ? ';
        sql += ' where b.boletoId = ?  ';

    this._connection.query(sql, [boleto.boletoAtraso, boleto.boletoAberto, boleto.multa, boleto.juros, boleto.boletoId ], callback);
}


BoletosDAO.prototype.listaTodos = function(idLogin, callback) {
    var sql = 'select b.boletoId, b.loginId, b.referencia, b.valor, b.multa, b.juros, b.dataPagamento,   ';
    sql += ' b.dataPago, b.boletoAtraso, b.descricao, b.boletoAberto, b.boletoPago, apt.numeroApt, apt.apartamentoId ';
    sql += ' from boletos b ';
    sql += ' inner join apartamento apt on b.numeroApartamento = apt.apartamentoId ';
    sql += ' inner join predio predio on apt.predio = predio.predioId '
    sql += ' where apt.predio = (select predio from apartamento where loginId = ? ) ';
    sql += ' and b.boletoPago = 0 ';
    
    this._connection.query(sql, idLogin, callback);
}

BoletosDAO.prototype.salvaLista = function(boletos, callback) {
    var values = [];
    var sql = 'insert into boletos ( referencia, valor, dataPagamento, loginId, numeroApartamento, descricao, boletoPago, predio ) VALUES ? ' ;

    for (var i = boletos.length - 1; i >= 0; i--) {
        console.log(boletos[i].predio);
        var tratar = [

                boletos[i].referencia,
                boletos[i].valorBoleto,
                boletos[i].dataPagamento,
                boletos[i].loginId,
                boletos[i].apartamento,
                boletos[i].descricaoBoleto,
                boletos[i].boletoPago = 0,
                boletos[i].predio

        ];
        
        values.push(tratar);
    }

    this._connection.query(sql, [values], callback);
}

BoletosDAO.prototype.atualizarBoletos = function(boletosAtualizar, callback) {
    var values = [];
    var dataHoje =  moment().format('YYYY-MM-DD ');
    var sql = 'update boletos b set b.boletoPago = 1, b.dataPago = ? ,b.valor = ? where b.boletoId = ? ';
    
    var tratar = [
            boletosAtualizar.boletoId
    ];
    
    values.push(tratar);
    this._connection.query(sql, [dataHoje, boletosAtualizar.valor, values], callback);
}

module.exports = function(){
    return BoletosDAO;
};