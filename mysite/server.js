
/**
 * Module dependencies.
 */
var port = process.env.port || 3000;

var express = require('express');
var swig = require('swig');
var app = module.exports = express.createServer();

/**
 * Schemas.
 */
var Mongoose = require('mongoose');
var db = Mongoose.connect('mongodb://localhost/db');
require('./schemas');

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
 * Routes.
 */
var home = require('./routes/index');
//var people = require('./routes/people');

app.get('/', home.index);

app.get('/people', function(req, res){
    var People = db.model('people');

    //res.render('people', { people: people });
    People.find({}, function(err, people) {
      res.render('people', { people: people });
    });
});

app.get('/people/:id', function(req, res){
    var People = db.model('people');

    People.find({id: req.params.id}, function(err, person) {
      console.log(person);
      res.render('person', { person: person[0] });
    });
});


/**
 * Server start.
 */
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
