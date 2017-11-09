function MoradoresDAO(app) {
    this._app = app;
}

var moment = require('moment');

 MoradoresDAO.prototype.listaMoradoresPredio = function(predioId, callback) {
 	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
		sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId, m.tipoMorador, apt.numeroApt ' ;
		sql += ' from moradores m ' ;
		sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
		sql += ' Where apt.predio = ? and m.ativo = 1 ' ;

	    connection.query(sql, [predioId], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

 MoradoresDAO.prototype.listaMoradoresAdministradorPredio = function(predioId, callback) {
 	//A diferença nesta query é que o traz os apartamentos Inativos também
 	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
		sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId, m.tipoMorador, apt.numeroApt ' ;
		sql += ' from moradores m ' ;
		sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
		sql += ' Where apt.predio = ? ' ;

	    connection.query(sql, [predioId], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

 MoradoresDAO.prototype.ativarDesativarMoradorPredio = function([moradorId, flagAtivaDesativa], callback) {
 	this._app.infra.connectionFactory(function(err, connection) {
	 	var dataInativoAtivo = moment().format('YYYY-MM-DD ');

		var sql = 'update moradores m set m.ativo = ?, m.dataInativo = ? ' ;
		sql += ' Where m.moradorId = ? ' ;
		console.log(sql);
	    connection.query(sql, [flagAtivaDesativa, dataInativoAtivo, moradorId], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

MoradoresDAO.prototype.atualizarDadosUsuario = function(dadosUsuario, callback) {
	this._app.infra.connectionFactory(function(err, connection) { 
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

	    connection.query(sql, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

MoradoresDAO.prototype.inserirDadosUsuario = function(dadosUsuario, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
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

	    connection.query(sql, [values], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}


MoradoresDAO.prototype.listaMoradorPorIdPredio = function(idLogin, callback) {
	this._app.infra.connectionFactory(function(err, connection) {
		var sql = 'select m.nomeCompleto, m.nomeApelido, m.telefone, m.email, m.cpf, m.apartamento_id, ' ;
		sql += ' m.ativo, m.dataInativo, m.dataCadastro, m.moradorId ' ;
		sql += ' from moradores m ' ;
		sql += ' inner Join apartamento apt on apt.apartamentoId = m.apartamento_id ' ;
		sql += ' Where apt.loginId = ?  ' ;
	    connection.query(sql, [idLogin], function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return MoradoresDAO;
};