
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
    res.render('look', {title: 'look'});
};

exports.draw = function(req, res){
    res.render('draw', {title: 'draw'});
};

exports.penpal = function(req, res){
    res.render('penpal', {title: 'penpal'});
};

exports.mypage = function(req, res){
    res.render('mypage', {title: 'mypage'});
};

exports.login = function(req, res){
    res.render('login', {title: 'mypage'});
};

exports.register = function(req, res){
    res.render('register', {title: 'mypage'});
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