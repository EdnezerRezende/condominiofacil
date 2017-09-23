function ApartamentoDAO(connection) {
    this._connection = connection;
}

ApartamentoDAO.prototype.lista = function(idLogin, callback) {
	console.log("ID na query: "+idLogin);
    var sql = 'select *  ';
    sql += '  from apartamento  ';
    sql += ' where apartamento.loginId = ? ';
    
    this._connection.query(sql, idLogin, callback);
}

module.exports = function(){
    return ApartamentoDAO;
};