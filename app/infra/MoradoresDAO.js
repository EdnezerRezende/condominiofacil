function MoradoresDAO(connection) {
    this._connection = connection;
}

var moment = require('moment');

 MoradoresDAO.prototype.listaMoradoresPredio = function(predioId, callback) {

	var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
	sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId, m.tipoMorador, apt.numeroApt ' ;
	sql += ' from moradores m ' ;
	sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
	sql += ' Where apt.predio = ? and m.ativo = 1 ' ;

    this._connection.query(sql, [predioId], callback);
}

 MoradoresDAO.prototype.listaMoradoresAdministradorPredio = function(predioId, callback) {
 	//A diferença nesta query é que o traz os apartamentos Inativos também

	var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
	sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId, m.tipoMorador, apt.numeroApt ' ;
	sql += ' from moradores m ' ;
	sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
	sql += ' Where apt.predio = ? ' ;

    this._connection.query(sql, [predioId], callback);
}

 MoradoresDAO.prototype.ativarDesativarMoradorPredio = function([moradorId, flagAtivaDesativa], callback) {
 	var dataInativoAtivo = moment().format('YYYY-MM-DD ');

	var sql = 'update moradores m set m.ativo = ?, m.dataInativo = ? ' ;
	sql += ' Where m.moradorId = ? ' ;
	console.log(sql);
    this._connection.query(sql, [flagAtivaDesativa, dataInativoAtivo, moradorId], callback);
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
	 	dataAlterado,
	 	dadosUsuario.moradorId
	 ];

	var sql = 'update moradores m set m.nomeCompleto = "'+dadosUsuario.nomeCompleto+'" , m.nomeApelido = "'+dadosUsuario.nomeApelido+'", m.telefone = "'+dadosUsuario.telefone+'", m.email = "'+dadosUsuario.email+'", ' ;
	sql += '  m.cpf = "'+dadosUsuario.cpf+'", m.dataUltimaAlteracao = "'+dataAlterado+'" ' ;
	sql += ' Where moradorId = "'+dadosUsuario.moradorId+'" ' ;
	console.log(sql);
    this._connection.query(sql, callback);
}

MoradoresDAO.prototype.inserirDadosUsuario = function(dadosUsuario, callback) {
	 var dataCadastro = moment().format('YYYY-MM-DD ');
	 var values = 
	 [
	 	dadosUsuario.nomeCompleto,
	 	dadosUsuario.nomeApelido,
	 	dadosUsuario.celular,
	 	dadosUsuario.email,
	 	dadosUsuario.cpf,
	 	dataCadastro,
	 	dadosUsuario.ativo,
	 	dadosUsuario.apartamentoId,
	 	dadosUsuario.tipoMorador
	 ];

	var sql = 'insert into moradores ( nomeCompleto , nomeApelido , telefone , email , ' ;
	sql += '  cpf, dataCadastro, ativo, apartamento_id, tipoMorador ) VALUES ( ? )';

    this._connection.query(sql, [values], callback);
}


MoradoresDAO.prototype.listaMoradorPorIdPredio = function(idLogin, callback) {

	var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
	sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId ' ;
	sql += ' from moradores m ' ;
	sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
	sql += ' Where apt.loginId = ?  ' ;
    this._connection.query(sql, [idLogin], callback);
}

module.exports = function(){
    return MoradoresDAO;
};