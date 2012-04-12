
/**
 * Mongo schemas.
 */

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

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

var People = new Schema({
    id: String,
    password: String,
    role: String,
    name: String,
    age: Number
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

//Mongoose.model('Person', Person);
Mongoose.model('people', People, 'people');