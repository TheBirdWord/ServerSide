var posts = require('./PostsRoute');
var auth = require('./AuthRoute');
var user = require('./UsersRoute');
var client = require('./ClientsRoute');
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

  app.post('/auth/token', auth.token);

  app.post('/client', client.newClient);
  //app.get('/client', )

  app.post('/user', user.newUser);
  app.get('/user', auth.authenticate('bearer', { session: false }),
    function(req, res) {
      // req.authInfo is set using the `info` argument supplied by
      // `BearerStrategy`.  It is typically used to indicate scope of the token,
      // and used in access control checks.  For illustrative purposes, this
      // example simply returns the scope in the response.
      res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
  );

	// end resources
}