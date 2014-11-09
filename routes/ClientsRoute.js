var logger = require('../lib/log');
var model = require('../models/ClientsModel');

function ClientsRoute() {

}

ClientsRoute.prototype = {
   newClient: function(req, res) {
      var client = new model({
         name: req.body.name,
         clientId: req.body.id,
         clientSecret: req.body.secret
      });

      client.save(function (err) {
        if (!err) {
            logger.info("Client created - %s:%s", client.name, client.clientId);
            return res.send({ status: 'OK', name:client.name, clientId:client.clientId});
         } else {
            console.log(err);
            if(err.name == 'ValidationError') {
               res.statusCode = 400;
               res.send({ error: 'Validation error' });
            } else {
               res.statusCode = 500;
               res.send({ error: 'Server error' });
            }
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
         }
      });
   }
}

module.exports = new ClientsRoute();