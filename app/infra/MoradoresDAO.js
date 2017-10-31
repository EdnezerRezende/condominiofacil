function MoradoresDAO(connection) {
    this._connection = connection;
}

var moment = require('moment');

 MoradoresDAO.prototype.listaMoradoresPredio = function(predioId, callback) {

	var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.identidade, m.apartamento_id, ' ;
	sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId ' ;
	sql += ' from moradores m ' ;
	sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
	sql += ' Where apt.predio = ? and m.ativo = 1 ' ;

    this._connection.query(sql, [predioId], callback);
}

MoradoresDAO.prototype.atualizarDadosUsuario = function(dadosUsuario, callback) {
	 var dataAlterado = moment().format('YYYY-MM-DD ');
	 var values = 
	 [
	 	dadosUsuario.nomeCompleto,
	 	dadosUsuario.nomeApelido,
	 	dadosUsuario.telefone,
	 	dadosUsuario.email,
	 	dadosUsuario.cpf,
	 	dadosUsuario.identidade,
	 	dataAlterado,
	 	dadosUsuario.moradorId
	 ];
	console.log(values);
	var sql = 'update moradores m set m.nomeCompleto = "'+dadosUsuario.nomeCompleto+'" , m.nomeApelido = "'+dadosUsuario.nomeApelido+'", m.telefone = "'+dadosUsuario.telefone+'", m.email = "'+dadosUsuario.email+'", ' ;
	sql += '  m.cpf = "'+dadosUsuario.cpf+'", m.identidade = "'+dadosUsuario.identidade+'", m.dataUltimaAlteracao = "'+dataAlterado+'" ' ;
	sql += ' Where moradorId = "'+dadosUsuario.moradorId+'" ' ;
	console.log(sql);
    this._connection.query(sql, callback);
}

MoradoresDAO.prototype.listaMoradorPorIdPredio = function(idLogin, callback) {

	var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.identidade, m.apartamento_id, ' ;
	sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId ' ;
	sql += ' from moradores m ' ;
	sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
	sql += ' Where apt.loginId = ?  ' ;
    this._connection.query(sql, [idLogin], callback);
}

module.exports = function(){
    return MoradoresDAO;
};