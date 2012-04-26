
/**
 * Mongo schemas.
 */

var Mongoose  = require('mongoose'),
    Schema    = Mongoose.Schema,
    ObjectId  = Schema.ObjectId;

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

var Friend = new Schema({
  user: {type: ObjectId, ref: 'users'},
  group: String
});
var Penpal = new Schema({
//  to: String,
  from: {type: ObjectId, ref: 'users'},
  message: String,
  date: { type: Date, default: Date.now },
  received: Boolean
});
var Badge = new Schema({
  from: {type: ObjectId, ref: 'users'},
  reason: String,
  point: Number,
  date: { type: Date, default: Date.now }
});
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

var Comment = new Schema({
  author: {type: ObjectId, ref: 'users'},
  date: { type: Date, default: Date.now },
  body: String,
  comments: [Comment]
});
var Join = new Schema({
  user: {type: ObjectId, ref: 'users'},
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
var Cheer = new Schema({
  user: {type: ObjectId, ref: 'users'},
  date: {type: Date, default: Date.now }
});
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
  author: {type: ObjectId, ref: 'users'},
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
// TODO: 어떻게 써야 되는거지?
Promise.getPoint = function() {
  return joins.length + cheers.length + comments.length;
 }

/**
 * Plugins
 */



/**
 * Define model.
 */
Mongoose.model('people', People, 'people');

Mongoose.model('promises', Promise, 'promises');
Mongoose.model('activities', Activity, 'activities');
Mongoose.model('join', Join);
Mongoose.model('cheer', Cheer);
Mongoose.model('comment', Comment);
exports.Users   = Mongoose.model('users', User, 'users');