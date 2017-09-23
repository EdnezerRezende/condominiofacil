function AgendaDAO(connection) {
    this._connection = connection;
}

var moment = require('moment');

AgendaDAO.prototype.lista = function(callback) {
	var now = moment().format('YYYY-MM-DD ');

	var sql = 'select * from agenda where dataProgramada >= ? ' ;
    this._connection.query(sql, now, callback);
}

module.exports = function(){
    return AgendaDAO;
};