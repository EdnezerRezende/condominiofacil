function ApartamentoDAO(app) {
    this._app = app;
}

ApartamentoDAO.prototype.lista = function(idLogin, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'select *  ';
        sql += '  from apartamento  ';
        sql += ' where apartamento.loginId = ? ';

        connection.query(sql, idLogin, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

ApartamentoDAO.prototype.listaCompleta = function( predio, callback ) {
    this._app.infra.connectionFactory(function(err, connection) {
        var sql = 'select apt.apartamentoId, apt.numeroApt, apt.nomeMorador, apt.loginId  ';
        sql += '  from apartamento  apt ';
        sql += '  inner join moradores morador on apt.apartamentoId = morador.apartamento_Id ';
        sql += '  where apt.predio = ? and morador.ativo = 1 ';
        sql += '  order by apt.numeroApt ';
        
        connection.query(sql, [predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });

}

ApartamentoDAO.prototype.inserirApartamento = function( dadosUsuario, callback ) {
    this._app.infra.connectionFactory(function(err, connection) {
        var apartamento = dadosUsuario.apartamento;
        var nomeMorador = dadosUsuario.nomeCompleto;
        var loginId = dadosUsuario.loginId;
        var predio = dadosUsuario.predio;
        var sql = 'insert into apartamento (numeroApt, nomeMorador, loginId, predio)  values ( ?, ?, ?, ? )';
        
        connection.query(sql, [apartamento, nomeMorador, loginId, predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return ApartamentoDAO;
};