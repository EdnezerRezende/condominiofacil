function ApartamentoDAO(connection) {
    this._connection = connection;
}

ApartamentoDAO.prototype.lista = function(idLogin, callback) {
    var sql = 'select *  ';
    sql += '  from apartamento  ';
    sql += ' where apartamento.loginId = ? ';
    
    this._connection.query(sql, idLogin, callback);
}

ApartamentoDAO.prototype.listaCompleta = function( predio, callback ) {
    var sql = 'select apt.apartamentoId, apt.numeroApt, apt.nomeMorador, apt.loginId  ';
    sql += '  from apartamento  apt ';
    sql += '  where apt.predio = ? ';
    sql += '  order by apt.numeroApt ';
    
    this._connection.query(sql, [predio], callback);
}

module.exports = function(){
    return ApartamentoDAO;
};