var mysql = require('mysql');

function createDBConnection(){
	if (process.env.NODE_ENV == 'production'){
		return mysql.createConnection({
			host: 'us-cdbr-iron-east-05.cleardb.net',
			user: 'be3010b49d1863',
			password: 'c725247b',
			connectTimeout: 100000,
			database: 'heroku_6d0ba34dd13df69',
		    headers: {
				'Accept':'application/json',
				'Content-type':'application/json'
			}
		})
	}
	if (!process.env.NODE_ENV){
		return mysql.createConnection({
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'admin',
			connectTimeout: 100000,
			database: 'condominiofacil',
		    headers: {
				'Accept':'application/json',
				'Content-type':'application/json'
			}
		});
	}
}

module.exports = function(){
	return createDBConnection;
}