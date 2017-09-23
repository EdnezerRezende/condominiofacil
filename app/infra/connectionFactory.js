var mysql = require('mysql');

function createDBConnection(){
	return mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'admin',
		database: 'condominiofacil',
	    headers: {
			'Accept':'application/json',
			'Content-type':'application/json'
		}
	});
}

module.exports = function(){
	return createDBConnection;
}
