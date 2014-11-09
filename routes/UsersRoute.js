var logger = require('../lib/log');
var model = require('../models/UsersModel');

function UsersRoute() {

}

UsersRoute.prototype = {
   newUser: function(req, res) {
      var user = new model({
         username: req.body.username,
         password: req.body.password
      });

      user.save(function (err) {
        if (!err) {
            logger.info("User created - %s", user.username);
            return res.send({ status: 'OK', username:user.username});
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

module.exports = new UsersRoute();