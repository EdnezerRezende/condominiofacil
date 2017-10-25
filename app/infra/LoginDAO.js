function LoginDAO(connection) {
    this._connection = connection;
}

LoginDAO.prototype.findOne = function(usuario, callback) {
  	const login = usuario.login.toString();
    const senha = usuario.senha.toString();
      var sql = 'select loginId, perfilId, predio from login where usuario = ? and senha = ? ' ;
    this._connection.query(sql, [login, senha], callback);
}

module.exports = function(){
    return LoginDAO;
};