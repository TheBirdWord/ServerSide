var posts = require('./PostsRoute');
/*
 * GET home page.
 */

var index = function(req, res){
  res.render('index', { title: 'The Bird' });
};

module.exports = exports = function(app) {

	// Homepage
	app.get('/', index);

	// begin resources
   app.get('/post/loc/:lat/:long', posts.findByLoc);
   app.get('/post/id/:id', posts.findById);
   app.post('/post', posts.addPost);
   app.put('/post/:id', posts.updatePost);
   app.delete('/post/:id', posts.deletePost);
	// end resources
}