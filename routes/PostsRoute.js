var logger = require('../lib/log');
var postModel = require('../models/PostsModel');
var postOwnerModel = require('../models/PostsOwnerModel');

function handleError(res, err) {
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


function PostsRoute() {

}

PostsRoute.prototype = {
   findByLoc: function(req, res) {
      res.send('This is not implemented now');
   },

   findById: function(req, res) {
      return postModel.findById(req.params.id, function (err, post) {
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
      postModel.create({
         title: req.headers.title,
         content: req.headers.content,
         media: req.headers.media,
         location: {
            latitude: req.headers.latitude,
            longitude: req.headers.longitude
         },
         poster: req.headers.handle
      }, function(err, post) {
         if (!err) {
            var post = new postOwnerModel({
               postId: post.postId,
               userId: req.user.userId
            });
            post.save(function(err) {
               if (!err) {
                  logger.info("PostOwner created");
               } else {
                  PostModel.remove({ postId: post.postId}, function(err) {
                     if (!err) {
                        logger.info("PostOwner create failed - Successfully removed Post");
                     } else {
                        handleError(res, err);
                     }
                  });
                  handleError(res, err);
               }
            });
            logger.info("Post created");
            return res.send({ status: 'OK', post:post });
        } else {
            handleError(res, err);
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