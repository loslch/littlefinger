
/**
 * routes
 */
var Mongoose    = require('mongoose'),
    db          = Mongoose.connect('mongodb://USERID:PASSWORD@ds031847.mongolab.com:31847/DBNAME'),
    util        = require('util');

exports.index = function(req, res){
    res.render('index', {title: 'Home'});
}

exports.look = function(req, res){
    res.render('look', {title: 'Look'});
}

exports.lookPromise = function(req, res){
    res.render('promise', {title: 'Look', promise: req.params.id});
}

exports.draw = function(req, res){
    if(!req.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('draw', {title: 'Draw up'});
    }
}

exports.getPromise = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.findOne({});

    //query.select(['title', 'author.name', 'date']);
    query.where('_id').equals(req.params.id);
    query.populate('author', ['name']);
    query.run(function(err, doc) {
        console.log(doc);
        res.json({
                id: doc._id,
                title: doc.title,
                author: doc.author.name,
                content: doc.content,
                tag: doc.tag,
                date: doc.date
            });
    });
}

exports.getLatestPromises = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.find({});

    //query.select(['title', 'author.name', 'date']);
    query.populate('author', ['name']);
    query.limit(10).desc('date');
    query.run(function(err, doc) {
        var ret = [];

        for(item in doc) {
            ret.push({
                id: doc[item]._id,
                title: doc[item].title,
                author: doc[item].author.name,
                date: doc[item].date
            });
        }
        res.json(ret);
    });
}

exports.makePromise = function(req, res){
    if(!req.loggedIn) {
        res.redirect('/login');
    } else {
        var Promise     = db.model('promises'),
            instance    = new Promise();

        instance.title              = req.body.title;
        instance.content.what       = req.body.what;
        instance.content.when       = req.body.when;
        instance.content.where      = req.body.where;
        instance.content.who        = req.body.who;
        instance.content.article    = req.body.article;
        instance.tag                = req.body.tag;
        instance.author             = req.user._id;

        instance.save(function(err, doc) {
            if(err) {
                console.log("ERROR: ", err);
                return;
            }
            if(!doc) {
                console.log("ERROR: ", "not found");
                return;
            }
            console.log("DATA: ", util.inspect(doc));
        });

        res.redirect('/draw');
    }
}

exports.penpal = function(req, res){
    res.render('penpal', {title: 'Penpal'});
}

exports.mypage = function(req, res){
    if(!req.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('mypage', {title: 'My page'});
    }
}

exports.login = function(login, password) {
    var Users    = db.model('users'),
        promises = this.Promise();

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