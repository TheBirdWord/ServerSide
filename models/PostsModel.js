var db = require('../lib/db');

var Post = new db.schema({
   title : {type: String, required: true}
});

// validation
Post.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

module.exports = db.model("Post", Post);