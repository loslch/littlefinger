
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var swig = require('swig');
var app = module.exports = express.createServer();

var port = process.env.port || 3000;
// Configuration

swig.init({ 
  root: __dirname + '/views',
  allowErrors: true,
  encoding: 'utf8'
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
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/people', routes.people);
app.get('/people/:id', routes.person);

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
