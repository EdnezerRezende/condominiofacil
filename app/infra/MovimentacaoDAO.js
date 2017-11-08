function MovimentacaoDAO(connection) {
    this._connection = connection;
}
var moment = require('moment');

MovimentacaoDAO.prototype.lista = function( predio, callback) {
	var sql = 'select * from movimentacao where predio = ? ';
    this._connection.query(sql, [predio], callback);
}

MovimentacaoDAO.prototype.salvaLista = function(contas, callback) {
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

    this._connection.query(sql, [values], callback);
}

MovimentacaoDAO.prototype.listaVlrEntrada = function( predio, callback) {
	var sql = 'SELECT  mE.referencia, sum(mE.valor) as vlrEntrada FROM movimentacao mE where mE.tipoRegistro = "E" and mE.predio = ? group by mE.referencia ';
    this._connection.query(sql, [predio],  callback);
}

MovimentacaoDAO.prototype.listaVlrSaida = function( predio, callback) {
	var sql = 'SELECT  mS.referencia, sum(mS.valor) as vlrSaida FROM movimentacao mS where mS.tipoRegistro = "S" and mS.predio = ? group by mS.referencia ';
    this._connection.query(sql, [predio], callback);
}

MovimentacaoDAO.prototype.listaReferencia = function(predio, callback) {
	var sql = 'select * from referencia where predio_id = ? ';
    this._connection.query(sql, [predio], callback);
}

MovimentacaoDAO.prototype.inserirReferencia = function(values, callback) {
    var referencias = [];
    var tratar = [
        values.referenciaAtual
    ];
    referencias.push(tratar);

    var sql = 'insert into referencia ( referencia, predio_id ) ';
    sql += ' SELECT ?, ? ' ;
    sql += ' FROM DUAL WHERE NOT EXISTS';
    sql += ' (SELECT r.referencia FROM referencia r WHERE r.referencia = ? and r.predio_id = ? order by r.referencia) ';
    this._connection.query(sql, [referencias, values.predio, referencias, values.predio ], callback);
}

MovimentacaoDAO.prototype.deletaItem = function(id, callback) {
    var sql = 'delete from movimentacao where movimentoId = ? ' ;
    this._connection.query(sql, id, callback);
}
//Após deletaItem ser executado, ele fará uma consulta neste método para ver se tem algum registro na tabela 
//movimento e caso não exista, apagará na tabela Referencia.
MovimentacaoDAO.prototype.deletaReferencia = function(values, callback) {

    var sql = 'delete from referencia  ' ;
    sql += ' where referencia.referencia = ? ';
    sql += '  and (select count(movimentacao.referencia) from movimentacao where movimentacao.referencia = ? and movimentacao.predio = ?) = 0';
    sql += '  and referencia.predio_id = ? ';

    this._connection.query(sql, [values.referenciaAtual,values.referenciaAtual, values.predio, values.predio ], callback);
}

module.exports = function(){
    return MovimentacaoDAO;
};