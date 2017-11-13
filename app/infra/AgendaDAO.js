function AgendaDAO(app) {
    this._app = app;
}

var moment = require('moment'); 

AgendaDAO.prototype.lista = function(predio, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
		var now = moment().format('YYYY-MM-DD ');

		var sql = 'select * from agenda where dataProgramada >= ? and predio = ? ' ;
	    connection.query(sql, [now, predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

AgendaDAO.prototype.listaTudo = function( callback ) {
	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'select * from agenda  ' ;
	    connection.query(sql, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

AgendaDAO.prototype.salvaLista = function(eventosAgenda, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
		var values = [];
		
		var sql = 'insert into agenda ( dataProgramada, descricao, predio ) VALUES ? ' ;

		for (var i = eventosAgenda.length - 1; i >= 0; i--) {
			var now = moment(eventosAgenda[i].data).format('YYYY-MM-DD HH:mm:ss');
			var tratar = [
					now,
					eventosAgenda[i].descricao,
					eventosAgenda[i].predio
			];
			values.push(tratar);
		}

	    connection.query(sql, [values], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

AgendaDAO.prototype.deletaItem = function(id, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'delete from agenda where racionamentoId = ? ' ;

	    connection.query(sql, id, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

AgendaDAO.prototype.deletaEventoPassado = function(id, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'delete from agenda where racionamentoId = ? ' ;

	    connection.query(sql, [id], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });

}

module.exports = function(){
    return AgendaDAO;
};