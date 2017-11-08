module.exports = function(app) {  
    var nodemailer = require('nodemailer');
    
    app.post('/contato', function(req, res) {
        var dadosEmail = req.body;
		// Vamos criar a conta que irá mandar os e-mails
		var transporter = nodemailer.createTransport({
		    // service: 'Gmail'
		    host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
		    auth: {
		        user: 'godoirezende@gmail.com', // Seu usuário no Gmail
		        pass: 'ludileca12' // A senha da sua conta no Gmail :-)
		    }
		});
		/*var tipoAssunto = dadosEmail.assunto;
		
		var mailOptions = [];*/
		// if ( tipoAssunto == 1 || tipoAssunto == 2 || tipoAssunto == 4 ){
		var	mailOptions = [];
		if ( !dadosEmail.comSindico ){

			mailOptions = [
				{
					from: dadosEmail.nome, // Quem está mandando
				    to: 'godoirezende@gmail.com', // E-mail do Administrador
				    subject: 'Condomínio Fácil', // O assunto
				    html: 'Usuário: '+dadosEmail.email + '<br/>Mensagem Enviada: ' + dadosEmail.mensagem  //mensagem enviada
				},
				{
					from: 'Administrador Condominío Fácil', // Quem está mandando
				    to: dadosEmail.email, // E-mail de quem está enviando 
				    subject: 'Condomínio Fácil', // O assunto
				    html: 'Olá <strong>' + dadosEmail.nome + '!</strong><br/> Recebemos seu e-mail e retornaremos em breve. Muito Obrigado!'
					
				}
			];
			
		} else {
			//fazer uma verificação para qual síndico deve ser enviado
			// e colocar numa variável o e-mail dele.

			mailOptions = [
					
					{
						from: dadosEmail.nome, // Quem está mandando
					    to: 'ludileca12@gmail.com', // E-mail do Síndico
					    subject: 'Condomínio Fácil', // O assunto
					    html: 'Usuário: '+dadosEmail.email + '<br/>Mensagem Enviada: ' + dadosEmail.mensagem  + ' <br/>Falar com o Síndico' //mensagem enviada
					},
					{
						from: 'Administrador Condominío Fácil', // Quem está mandando
					    to: dadosEmail.email, // E-mail de quem está enviando 
					    subject: 'Condomínio Fácil', // O assunto
					    html: 'Olá <strong>' + dadosEmail.nome + '!</strong><br/> Recebemos seu e-mail e retornaremos em breve. Muito Obrigado!'
						
					}
				]
		}
		for (var i = 0; i < mailOptions.length; i++) {
				
			transporter.sendMail(mailOptions[i], function (err, info) {
			    if ( err ) { 
			    	console.log(err);
			    }else{
			    	if (i = 1){
						res.json('E-mail enviado!');
			    	}
			    }
			});
		};
    });
}