
/**
 * Mongo schemas.
 */

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/**
 * Schema definition
 */

var Users = new Schema({
  login: { type: String, required: true, index: { unique: true, sparse: true } },
  password: String,
  name: String,
  age: Number,
  alive: Boolean
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

Mongoose.model('people', People, 'people');
Mongoose.model('users', Users, 'users');