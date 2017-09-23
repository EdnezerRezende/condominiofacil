function BoletosDAO(connection) {
    this._connection = connection;
}

BoletosDAO.prototype.lista = function(idLogin, callback) {
    var sql = 'select *  ';
    sql += '  from boletos b ';
    sql += ' where b.loginId = ? ';
    
    this._connection.query(sql, idLogin, callback);
}

module.exports = function(){
    return BoletosDAO;
};