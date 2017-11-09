function PredioDAO(app) {
    this._app = app;
}

PredioDAO.prototype.lista = function(predio, callback) {
	this._app.infra.connectionFactory(function(err, connection) { 
	    var sql = 'select  apt.qtdApartamentos  ';
	    sql += '  from predio apt ';
	    sql += ' where apt.predioId = ? ';
	    
	    connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}


module.exports = function(){
    return PredioDAO;
};