var db = require('../lib/db');

var PostOwner = new db.schema({
   postId: {
      type: String,
      required: true
   },
   userId: {
      type: String,
      required: true
   }
});

module.exports = db.model("PostOwner", PostOwner);