function MovimentacaoDAO(connection) {
    this._connection = connection;
}
var moment = require('moment');

MovimentacaoDAO.prototype.lista = function(callback) {
	var sql = 'select * from movimentacao ';
    this._connection.query(sql, callback);
}

MovimentacaoDAO.prototype.salvaLista = function(contas, callback) {
    var values = [];
    
    var sql = 'insert into movimentacao ( descricao, tipoRegistro, valor, dataInserido, loginId, referencia ) VALUES ? ' ;

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
                referencia
        ];

        values.push(tratar);
    }

    this._connection.query(sql, [values], callback);
}

MovimentacaoDAO.prototype.listaVlrEntrada = function(callback) {
	var sql = 'SELECT  mE.referencia, sum(mE.valor) as vlrEntrada FROM movimentacao mE where mE.tipoRegistro = "E" group by mE.referencia ';
    this._connection.query(sql, callback);
}

MovimentacaoDAO.prototype.listaVlrSaida = function(callback) {
	var sql = 'SELECT  mS.referencia, sum(mS.valor) as vlrSaida FROM movimentacao mS where mS.tipoRegistro = "S" group by mS.referencia ';
    this._connection.query(sql, callback);
}

MovimentacaoDAO.prototype.listaReferencia = function(callback) {
	var sql = 'select * from referencia';
    this._connection.query(sql, callback);
}

MovimentacaoDAO.prototype.inserirReferencia = function(referenciaAtual, callback) {
    var referencias = [];
    var tratar = [
        referenciaAtual
    ];
    referencias.push(tratar);

    var sql = 'insert into referencia ( referencia ) ';
    sql += ' SELECT "' + referencias + '"';
    sql += ' FROM DUAL WHERE NOT EXISTS';
    sql += ' (SELECT r.referencia FROM referencia r WHERE r.referencia = "' + referencias + '" order by r.referencia) ';
    console.log(sql);
    this._connection.query(sql, callback);
}

module.exports = function(){
    return MovimentacaoDAO;
};