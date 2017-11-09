
module.exports = function(app) {  
    app.post('/predio/:predio', function(req, res) {

        var predio = req.params.predio;

        var predioDAO = new app.infra.PredioDAO(app);
        predioDAO.lista(predio, function(err, results) {
        	if(err) throw err;
            console.log(results);
        	res.json(results);
        });
 
    });
  
}