
/**
 * Mongo schemas.
 */

var Mongoose  = require('mongoose'),
    Schema    = Mongoose.Schema;

/**
 * Schema definition
 */
// dummy people schema
var People = new Schema({
  id: String,
  password: String,
  role: String,
  name: String,
  age: Number
});

var Friend = new Schema();
var Penpal = new Schema();
var Badge = new Schema();
var User = new Schema({
  login: { type: String, required: true, index: { unique: true, sparse: true } },
  password: String,
  name: String,
  age: Number,
  location: String,
  interest: String,
  alive: Boolean,
  points: Number,
  type: String,
  friends: [Friend],
  penpals: [Penpal],
  badges: [Badge]
});

var Comment = new Schema();
var Join = new Schema();
var Cheer = new Schema();
var Promise = new Schema({
  title: String,
  content: {
    when: Date,
    where: String,
    how: String,
    why: String,
    what: String,
    who: String,
    article: String
  },
  author: String,
  date: { type: Date, default: Date.now },
  tag: String,
  comments: [Comment],
  joins: [Join],
  cheers: [Cheer]
});

var Activity = new Schema({
  user: String,
  body: String,
  action: String,
  date: { type: Date, default: Date.now }
});


/**
 * Methods
 */
Friend.add({
  user: String,
  group: String
});

Penpal.add({
//  to: String,
  from: String,
  message: String,
  date: { type: Date, default: Date.now },
  received: Boolean
});

Badge.add({
  from: String,
  reason: String,
  point: Number,
  date: { type: Date, default: Date.now }
});

Comment.add({
  author: String,
  date: { type: Date, default: Date.now },
  body: String,
  comments: [Comment]
});

Join.add({
  user: String,
  date: { type: Date, default: Date.now },
  information: {
    name: String,
    email: String,
    phone: String,
    password: String,
    party: String,
    homepage: String,
    message: String
  }
});

Cheer.add({
  user: String,
  date: {type: Date, default: Date.now }
});


/**
 * Plugins
 */


/**
 * Define model.
 */
Mongoose.model('people', People, 'people');
Mongoose.model('users', User, 'users');
Mongoose.model('promises', Promise, 'promises');
Mongoose.model('activities', Activity, 'activities');