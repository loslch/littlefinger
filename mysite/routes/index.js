
/**
 * routes
 */
var Mongoose = require('mongoose');
var db = Mongoose.connect('mongodb://localhost/db');
require('../schemas');

exports.index = function(req, res){
    res.render('index', {title: 'home'});
};

exports.look = function(req, res){
    res.render('index', {title: 'look'});
};

exports.draw = function(req, res){
    res.render('index', {title: 'draw'});
};

exports.penpal = function(req, res){
    res.render('index', {title: 'penpal'});
};

exports.mypage = function(req, res){
    res.redirect('/login');
    //res.render('index', {});
};

exports.login = function(req, res){
    res.render('login', {});
};

exports.register = function(req, res){
    res.render('register', {});
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