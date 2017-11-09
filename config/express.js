var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var consign = require('consign');
var timeout = require('connect-timeout');


/*var fs = require('fs');
 var https = require('https');
 var path = require('path');
 var directoryToServe = 'client';
 var port = 3443;*/


module.exports = function() {
    var app = express();
    
   
    app.use(history());
    app.use(timeout('5s'));
    app.use(haltOnTimedout);
    app.set('secret', 'seosenhornaoguardaratorreemvaovigiaasentinela'); 
    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/public');
     // app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

/*    var httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
    }
*/

    consign({cwd: 'app'})
        .include('routes/auth.js')
        .then('routes')
        .then('infra')
        .into(app);
    
    function haltOnTimedout (req, res, next) {
      if (!req.timedout) next()
    }

    return app;
}
