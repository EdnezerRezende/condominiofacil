function PredioDAO(connection) {
    this._connection = connection;
}

PredioDAO.prototype.lista = function(predio, callback) {
    var sql = 'select  apt.qtdApartamentos  ';
    sql += '  from predio apt ';
    sql += ' where apt.predioId = ? ';
    
    this._connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
});
}


module.exports = function(){
    return PredioDAO;
};