module.exports = function(app) {  
    app.post('/contato', function(req, res) {
        var dadosEmail = req.body;
        var nodemailer = require('nodemailer');
		// Vamos criar a conta que irá mandar os e-mails
		var conta = nodemailer.createTransport({
		    // service: 'Gmail', // Existem outros services, você pode procurar
		    //                   // na documentação do nodemailer como utilizar
		    //                   // os outros serviços
		    host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
		    auth: {
		        user: 'godoirezende@gmail.com', // Seu usuário no Gmail
		        pass: 'ludileca12' // A senha da sua conta no Gmail :-)
		    }
		});

		conta.sendMail({
		    from: dadosEmail.nome, // Quem está mandando
		    to: dadosEmail.email, // E-mail de quem está enviando 
		    subject: 'Condomínio Fácil', // O assunto
		    html: dadosEmail.mensagem, // A Mensagem do  e-mail
		}, function(err){
		    if(err)
		        throw err;
		    res.json('E-mail enviado!');
		});
    });

  
}