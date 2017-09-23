function MovimentacaoDAO(connection) {
    this._connection = connection;
}
var moment = require('moment');

MovimentacaoDAO.prototype.lista = function(callback) {
	var sql = 'select * from movimentacao ';
    this._connection.query(sql, callback);
}

MovimentacaoDAO.prototype.listaReferencia = function(callback) {
	var sql = 'select distinct referencia.referencia from movimentacao referencia';
    this._connection.query(sql, callback);
}

module.exports = function(){
    return MovimentacaoDAO;
};