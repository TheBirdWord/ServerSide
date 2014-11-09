var db = require('../lib/db');

var Post = new db.schema({
   title: {
      type: String, 
      required: true
   },
   content: {
      type: String,
      required: true
   },
   media: {
      type: String,
      required: false
   },
   location: {
      latitude: {
         type: Number,
         required: true
      },
      longitude: {
         type: Number,
         required: true
      }
   },
   words: [{
      id: {
         type: String,
         required: true
      },
      display: {
         type: String,
         required: true
      }
   }],
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
   created: {
      type: Date,
      default: Date.now
   }
});

Post.virtual('postId')
   .get(function () {
      return this.id;
   });

// validation
Post.path('title').validate(function (v) {
    return v.length > 0 && v.length < 70;
});

module.exports = db.model("Post", Post);