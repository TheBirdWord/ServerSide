var passport = require('passport');
var oauth2 = require('../lib/oauth2');

function AuthRoute() {

}

AuthRoute.prototype = {
   token: oauth2.token,
   authenticate: passport.authenticate.bind(passport)
}

module.exports = new AuthRoute();