
/**
 * Module dependencies.
 */
var port      = process.env.port || 3000,
    express   = require('express'), // http://expressjs.com/
    app       = module.exports = express.createServer(),
    swig      = require('swig'), // http://paularmstrong.github.com/swig/
    everyauth = require('everyauth'), // http://everyauth.com/
    util      = require('util'),
    schemas   = require('./schemas'),
    route     = require('./routes');

/**
 * Configuration.
 */
swig.init({ 
  root: __dirname + '/views',
  allowErrors: true,
  encoding: 'utf8'
});

everyauth.helpExpress(app);
everyauth.everymodule.findUserById( function(userId, callback) {
  schemas.Users.findById(userId, callback);
});
everyauth.everymodule.logoutPath('/logout');
everyauth.everymodule.logoutRedirectPath('/');

everyauth
  .facebook
    .appId('136867243074910')
    .appSecret('3c9d2b75d8aaaa3f155816f7877314ee')
    .entryPath('/auth/facebook')
    .findOrCreateUser(route.GetOrCreateUserByFb)
    .scope('email')
    .redirectPath('/');

everyauth
  .password
    .getLoginPath('/login')
    .postLoginPath('/login')
    .authenticate(route.login)
    .loginSuccessRedirect('/')
    .getRegisterPath('/register')
    .postRegisterPath('/register')
    .validateRegistration(route.registerValidation)
    .registerUser(route.register)
    .registerSuccessRedirect('/')
  //    .loginFormFieldName('login')
  //    .passwordFormFieldName('password')
    .loginView('login')
    .registerView('register')
    .extractExtraRegistrationParams(function(req) {
      return {name: req.body.username};
    });

app.configure(function(){
  app.register('.html', swig);

  app.set('views', __dirname + '/views');
  app.set('view cache', true);
  app.set('view engine', 'html');
  app.set('view options', { layout: false });

  app.use(express.logger());
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf!"}));
  app.use(everyauth.middleware());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.dynamicHelpers({
  session   : function(req, res) { return req.session;  },
  loggedIn  : function(req, res) { return req.loggedIn; },
  user      : function(req, res) { return req.user;     }
});

/**
 * Routes.
 */
app.get('/', route.index);
app.get('/look', route.look);
app.get('/look/:id', route.lookPromise);
app.get('/draw', route.draw);
app.get('/penpal', route.penpal);
app.get('/mypage', route.mypage);


/**
 * REST Action route.
 */
app.post('/draw', route.makePromise);

app.get('/promise/latest/:limit?', route.getLatestPromises);
app.get('/promise/hottest/:limit?', route.getHottestPromises);
app.get('/promise/zone/:contry/:limit?', route.getZonePromises);
app.get('/promise/search/:keyword/:limit?', route.getSearchPromises);
app.get('/promise/:id', route.getPromise);

app.get('/promise/:id/join', route.getJoinPromise);
app.post('/promise/:id/join/push', route.pushJoinPromise);
app.post('/promise/:id/join/pull', route.pullJoinPromise);

app.get('/promise/:id/cheer', route.getCheerPromise);
app.post('/promise/:id/cheer/push', route.pushCheerPromise);
app.post('/promise/:id/cheer/pull', route.pullCheerPromise);

app.get('/promise/:id/comment', route.getComments);
app.post('/promise/:id/comment/write', route.writeComment);
app.post('/promise/:id/comment/delete', route.deleteComment);


/**
 * test
 */
//app.get('/people', route.people);
//app.get('/people/:id', route.person);

/**
 * Server start.
 */
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});