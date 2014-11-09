var logger = require('../lib/log');
var model = require('../models/PostsModel');

function PostsRoute() {

}

PostsRoute.prototype = {
   findByLoc: function(req, res) {
      res.send('This is not implemented now');
   },

   findById: function(req, res) {
      return model.findById(req.params.id, function (err, post) {
        if(!post) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', post:post });
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
     });
   },

   addPost: function(req, res) {
      var post = new model({
         title: req.body.title
       });

      post.save(function (err) {
        if (!err) {
            logger.info("post created");
            return res.send({ status: 'OK', post:post });
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
   },

   updatePost: function(req, res) {
      res.send('This is not implemented now');
   },

   deletePost: function(req, res) {
      res.send('This is not implemented now');
   }
}

module.exports = new PostsRoute()