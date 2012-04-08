
/**
 * Define url rules.
 */

var home = require('./routes/index');
var people = require('./routes/people');


// Home
app.get('/', home.index);

// People
app.get('/people', people.people);
app.get('/people/:id', people.person);