function MovimentacaoDAO(connection) {
    this._connection = connection;
}
var moment = require('moment');

MovimentacaoDAO.prototype.lista = function(callback) {
	var sql = 'select * from movimentacao ';
    this._connection.query(sql, callback);
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

module.exports = function(){
    return MovimentacaoDAO;
};