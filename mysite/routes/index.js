
/**
 * routes
 */
var Mongoose = require('mongoose');
var db = Mongoose.connect('mongodb://localhost/db');
require('../schemas');

exports.index = function(req, res){
    res.render('index', {});
};

exports.login = function(req, res){
    res.render('login', {});
};

// test
exports.people = function(req, res){
    var People = db.model('people');

    People.find({}, function(err, people) {
      res.render('people', { people: people });
    });
}

exports.person = function(req, res){
    var People = db.model('people');

    People.find({id: req.params.id}, function(err, person) {
      res.render('person', { person: person[0] });
    });
}