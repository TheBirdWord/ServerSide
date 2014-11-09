var logger = require('../lib/log');
var commentModel = require('../models/CommentsModel');
var commentOwnerModel = require('../models/CommentsOwnerModel');

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


function CommentsRoute() {

}

CommentsRoute.prototype = {
  findById: function(req, res) {
    return commentModel.findById(req.params.id, function(err, comment) {
      if(!comment) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        return res.send({ status: 'OK', comment:comment });
      } else {
        res.statusCode = 500;
        logger.error('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
   });
  },

  addComment: function(req, res) {
    commentModel.create({
       content: req.body.content,
       media: req.body.media,
       poster: req.body.handle,
       parentPostId: req.body.postId,
       parentCommentId: req.body.parentCommentId
    }, function(err, comment) {
       if (!err) {
          var comment = new commentOwnerModel({
             commentId: comment.commentId,
             userId: req.user.userId
          });
          comment.save(function(err) {
             if (!err) {
                logger.info("CommentOwner created");
             } else {
                CommentModel.remove({ commentId: comment.commentId}, function(err) {
                   if (!err) {
                      logger.info("CommentOwner create failed - Successfully removed Comment");
                   } else {
                      handleError(res, err);
                   }
                });
                handleError(res, err);
             }
          });
          logger.info("Comment created");
          return res.send({ status: 'OK', comment:comment });
      } else {
          handleError(res, err);
      }
    });
  },

  updateComment: function(req, res) {
    res.send('This is not implemented now');
  },

  deleteComment: function(req, res) {
    res.send('This is not implemented now');
  }
}

module.exports = new CommentsRoute()