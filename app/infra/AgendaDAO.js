function AgendaDAO(connection) {
    this._connection = connection;
}

var moment = require('moment');

AgendaDAO.prototype.lista = function(callback) {
	var now = moment().format('YYYY-MM-DD ');

	var sql = 'select * from agenda where dataProgramada >= ? ' ;
    this._connection.query(sql, now, callback);
}

AgendaDAO.prototype.salvaLista = function(eventosAgenda, callback) {
	var values = [];
	
	var sql = 'insert into agenda ( dataProgramada, descricao ) VALUES ? ' ;

	for (var i = eventosAgenda.length - 1; i >= 0; i--) {
		var now = moment(eventosAgenda[i].data).format('YYYY-MM-DD ');
		var tratar = [
				now,
				eventosAgenda[i].descricao
		];
		values.push(tratar);
	}

    this._connection.query(sql, [values], callback);
}

AgendaDAO.prototype.deletaItem = function(id, callback) {
	console.log("Id: " + id);
	var sql = 'delete from agenda where racionamentoId = ? ' ;

    this._connection.query(sql, id, callback);
}

module.exports = function(){
    return AgendaDAO;
};