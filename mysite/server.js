
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
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.set('view cache', true);
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('view options', { layout: false });
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
