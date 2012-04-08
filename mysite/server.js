
/**
 * Module dependencies.
 */

var port = process.env.port || 3000;
var app = module.exports = require('express').createServer();

GLOBAL.app = app;


// Configuration
require('./configure.js');

// Routes
require('./urls.js');

// Server start
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
