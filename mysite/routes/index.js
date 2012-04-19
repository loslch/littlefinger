
/**
 * routes
 */
var Mongoose    = require('mongoose'), // http://mongoosejs.com/
    db          = Mongoose.connect('mongodb://USERID:PASSWORD@ds031847.mongolab.com:31847/DBNAME'),
    util        = require('util');

exports.index = function(req, res){
    res.render('index', {title: 'home'});
}

exports.look = function(req, res){
    res.render('look', {title: 'look'});
}

exports.draw = function(req, res){
    res.render('draw', {title: 'draw'});
}

exports.penpal = function(req, res){
    res.render('penpal', {title: 'penpal'});
}

exports.mypage = function(req, res){
    if(!req.loggedIn) res.redirect('/login');
    else res.render('mypage', {title: 'mypage'});
}

exports.login = function(login, password) {
    var Users    = db.model('users'),
        promise = this.Promise();

    Users.findOne({login: login, password: password}, function(err, doc) {
        if(err) {
            console.log("Error using users:\n", err);
            return promise.fulfill([err]);
        }
        if(!doc) {
            console.log("User donsn't exists.\n");
            return promise.fulfill(["User donsn't exists."]);
        }
        promise.fulfill(user=doc);
    });

    return promise;
}
exports.GetOrCreateUserByFb = function (session, accessToken, accessToExtra, fbUserMetadata) {
    var Users    = db.model('users'),
        promise  = this.Promise(),
        instance = new Users();

    Users.findOne({login: fbUserMetadata.email}, function(err, doc) {
        if(err) {
            console.log("Exception on login.");
            return promise.fulfill(["Exception on login"]);
        } 
        if(doc) {
            promise.fulfill(user=doc);
        } else {
            console.log("Not exists user yet.");

            instance.login = fbUserMetadata.email;
            instance.password = fbUserMetadata.id;
            instance.name = fbUserMetadata.name;
            instance.age = 0;
            instance.alive = true;
            instance.save(function(err, doc) {
                if(err) {
                    console.log("Exception:\n", err);
                    return promise.fulfill(["Exception", err]);
                }
                promise.fulfill(user=doc);
            });
        }
    })
    console.log(util.inspect(fbUserMetadata));
    return promise;
}

exports.register = function (newUserAttributes) {
    var Users    = db.model('users'),
        promise  = this.Promise(),
        instance = new Users();

    instance.login = newUserAttributes.login;
    instance.password = newUserAttributes.password;
    instance.name = newUserAttributes.name;
    instance.age = 0;
    instance.alive = true;
    instance.save(function(err, doc) {
        if(err) {
            console.log("Error using users:\n", err);
            return promise.fulfill(["Already using same user name.", err]);
        }
        promise.fulfill(user=doc);
    });

    return promise;
}
exports.registerValidation = function(newUserAttributes) {
    console.log(util.inspect(newUserAttributes));
    return null;
    //var errors = validate(login, password, extraParams);
    //return errors;
}


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