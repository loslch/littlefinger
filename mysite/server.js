
/**
 * Module dependencies.
 */
var port = process.env.port || 3000;

var express = require('express');
var swig = require('swig');
var app = module.exports = express.createServer();


/**
 * Configuration.
 */
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


/**
 * Schemas.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema definition
 */

var Person = new Schema({
    name: {
        first: String
      , last : String
    }
  , email: { type: String, required: true, index: { unique: true, sparse: true } }
  , alive: Boolean
});

/**
 * Methods
 */


/**
 * Plugins
 */


/**
 * Define model.
 */

mongoose.model('Person', Person);


/**
 * Routes.
 */
var home = require('./routes/index');
var people = require('./routes/people');

// Home
app.get('/', home.index);

// People
app.get('/people', people.people);
app.get('/people/:id', people.person);


/**
 * Server start.
 */
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
