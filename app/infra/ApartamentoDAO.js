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
    sql += '  inner join moradores morador on apt.apartamentoId = morador.apartamento_Id ';
    sql += '  where apt.predio = ? and morador.ativo = 1 ';
    sql += '  order by apt.numeroApt ';
    
    this._connection.query(sql, [predio], callback);
}

ApartamentoDAO.prototype.inserirApartamento = function( dadosUsuario, callback ) {
    var apartamento = dadosUsuario.apartamento;
    var nomeMorador = dadosUsuario.nomeCompleto;
    var loginId = dadosUsuario.loginId;
    var predio = dadosUsuario.predio;
    var sql = 'insert into apartamento (numeroApt, nomeMorador, loginId, predio)  values ( ?, ?, ?, ? )';
    
    this._connection.query(sql, [apartamento, nomeMorador, loginId, predio], callback);
}

module.exports = function(){
    return ApartamentoDAO;
};