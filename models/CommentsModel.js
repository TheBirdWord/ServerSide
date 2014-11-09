var db = require('../lib/db');

var Comment = new db.schema({
   content: {
      type: String,
      required: true
   },
   media: {
      type: String,
      required: false
   },
   pecks: {
      up: {
         type: Number,
         default: 0
      },
      down: {
         type: Number,
         default: 0
      }
   },
   poster: {
      type: String,
      required: true
   },
   parentPostId: {
      type: String,
      required: true
   },
   parentCommentId: {
      type: String,
      required: true
   }
});

Comment.virtual('commentId')
   .get(function () {
      return this.id;
   });

module.exports = db.model("Comment", Comment);