
/**
 * Mongo schemas.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


/**
 * Mongoose connection helper.
 */

function connect () {
  return mongoose.createConnection('mongodb://localhost/test');
}

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


exports.mongoose = mongoose;