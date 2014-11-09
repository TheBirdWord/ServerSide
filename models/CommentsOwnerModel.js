var db = require('../lib/db');

var CommentOwner = new db.schema({
   commentId: {
      type: String,
      required: true
   },
   userId: {
      type: String,
      required: true
   }
});

module.exports = db.model("CommentOwner", CommentOwner);