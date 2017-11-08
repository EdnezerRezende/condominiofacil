var mysql = require('mysql');
var pool = null;

function _criaPool(){
	if (process.env.NODE_ENV == 'production'){
		var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
	    var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
	    pool =  mysql.createPool({
	           connectionLimit: 10, // Limite do ClearDB
	           host: 'us-cdbr-iron-east-05.cleardb.net',
	           user: 'be3010b49d1863',
	           password: 'c725247b',
	           database: 'heroku_6d0ba34dd13df69'
		});
		/*return mysql.createConnection({
			host: 'us-cdbr-iron-east-05.cleardb.net',
			user: 'be3010b49d1863',
			password: 'c725247b',
			database: 'heroku_6d0ba34dd13df69',
		    headers: {
				'Accept':'application/json',
				'Content-type':'application/json'
			}
		})*/
	}
	if (!process.env.NODE_ENV){
		pool =  mysql.createPool({
		    connectionLimit: 100,
		    host: 'localhost',
		    user: 'root',
		    password: 'admin',
		    database: 'condominiofacil'
		});
	}
	/*return mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'admin',
		database: 'condominiofacil',
	    headers: {
			'Accept':'application/json',
			'Content-type':'application/json'
		}
	});*/
	// Se a fila ta cheia
	    pool.on('enqueue', function () {
	        //console.error('Waiting for available connection slot');
	});
}

_criaPool();


var connectMySQL = function(callback) {

    return pool.getConnection(function (err, connection) {
        if(err) {
            console.log('Error getting mysql_pool connection: ' + err);
            pool.end(function onEnd(error) {
                if(error) {
                    console.log('Erro ao terminar o pool: ' + error);
                }
                // All connections are now closed once they have been returned with connection.release()
                // i.e. this waits for all consumers to finish their use of the connections and ends them.
                // Recria o pool
                _criaPool();
            });
            return;
        }
        console.log(connection);
        return callback(null, connection);
    });

};


module.exports = function(){
	return connectMySQL;
}
