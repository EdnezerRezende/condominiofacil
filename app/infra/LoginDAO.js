function LoginDAO(app) {
    this._app = app;
}

LoginDAO.prototype.findOne = function(usuario, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
      	const login = usuario.login.toString();
        const senha = usuario.senha.toString();
          var sql = 'select loginId, perfilId, predio from login where usuario = ? and senha = md5(?) ' ;
        connection.query(sql, [login, senha], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

LoginDAO.prototype.inserirLogin = function(dadosUsuario, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
        const usuario = dadosUsuario.cpf;
        const senha = dadosUsuario.cpf.substring(0,4);

        const perfilId = 2;
        const predio = dadosUsuario.predio;

        var sql = 'insert into login (usuario, senha, perfilId, predio) values ( ?, md5(?), ?, ? ) ' ;
        connection.query(sql, [usuario, senha, perfilId, predio], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });   
}

LoginDAO.prototype.alterarSenha = function(usuario, callback) {
    this._app.infra.connectionFactory(function(err, connection) {
    	const loginId = usuario.loginId;
    	const senha = usuario.senhaAtual.toString();
      	const senhaNova = usuario.senhaNova.toString();

        var sql = 'update login set senha = md5(?) where loginId = ? and senha = md5(?) ' ;
        connection.query(sql, [senhaNova, loginId, senha ], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return LoginDAO;
};