function PredioDAO(connection) {
    this._connection = connection;
}

PredioDAO.prototype.lista = function(predio, callback) {
    var sql = 'select  apt.qtdApartamentos  ';
    sql += '  from predio apt ';
    sql += ' where apt.predioId = ? ';
    
    this._connection.query(sql, [predio], callback);
}


module.exports = function(){
    return PredioDAO;
};