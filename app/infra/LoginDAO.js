function LoginDAO(connection) {
    this._connection = connection;
}

LoginDAO.prototype.findOne = function(usuario, callback) {
  	const login = usuario.login.toString();
    const senha = usuario.senha.toString();
      var sql = 'select loginId, perfilId, predio from login where usuario = ? and senha = md5(?) ' ;
    this._connection.query(sql, [login, senha], callback);
}

LoginDAO.prototype.alterarSenha = function(usuario, callback) {
	const loginId = usuario.loginId;
	const senha = usuario.senhaAtual.toString();
  	const senhaNova = usuario.senhaNova.toString();

    var sql = 'update login set senha = md5(?) where loginId = ? and senha = md5(?) ' ;
    this._connection.query(sql, [senhaNova, loginId, senha ], callback);
}

module.exports = function(){
    return LoginDAO;
};