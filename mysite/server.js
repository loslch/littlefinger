
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

app.get('/draw', route.draw);

app.get('/penpal', route.penpal);

app.get('/mypage', route.mypage);

//test
app.get('/people', route.people);
app.get('/people/:id', route.person);

/**
 * Server start.
 */
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});