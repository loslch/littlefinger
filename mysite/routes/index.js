
/**
 * routes
 */
var Mongoose    = require('mongoose'),
    db          = Mongoose.connect('mongodb://USERID:PASSWORD@ds031847.mongolab.com:31847/DBNAME'),
    util        = require('util');


exports.index = function(req, res) {
    res.render('index', {title: 'Home'});
}

exports.look = function(req, res) {
    res.render('look', {title: 'Look'});
}

exports.lookPromise = function(req, res) {
    res.render('promise', {title: 'Look', promise: req.params.id});
}

exports.draw = function(req, res){
    if(!req.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('draw', {title: 'Draw up'});
    }
}

exports.penpal = function(req, res) {
    res.render('penpal', {title: 'Penpal'});
}

exports.mypage = function(req, res) {
    if(!req.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('mypage', {title: 'My page'});
    }
}


/***
 * REST Action below
 */
exports.getPromise = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.findOne({});

    //query.select(['title', 'author.name', 'date']);
    query.where('_id').equals(req.params.id);
    query.populate('author', ['name']);
    query.run(function(err, doc) {
        if(err) {
            console.log("ERROR: ", err);
            return;
        }
        if(!doc) {
            console.log("ERROR: ", "not found");
            return;
        }
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
    var Promise = db.model('promises'),
        query   = Promise.find({}),
        limit   = (req.params.limit === 'undefined')? 10: req.params.limit;

    //query.select(['title', 'author.name', 'date']);
    query.populate('author', ['name']);
    query.limit(limit).desc('date');
    query.run(function(err, doc) {
        if(err) {
            console.log("ERROR: ", err);
            return;
        }
        if(!doc) {
            console.log("ERROR: ", "not found");
            return;
        }
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
exports.getHottestPromises = function(req, res) {
    var Promise = db.model('promises'),
        query   = Promise.find({}),
        limit   = (req.params.limit === 'undefined')? 10: req.params.limit;

    //query.select(['title', 'author.name', 'date']);
    query.populate('author', ['name']);
    query.limit(limit).desc('date');
    query.run(function(err, doc) {
        if(err) {
            console.log("ERROR: ", err);
            return;
        }
        if(!doc) {
            console.log("ERROR: ", "not found");
            return;
        }
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
exports.getZonePromises = function(req, res) {
    var Promise = db.model('promises'),
        query   = Promise.find({}),
        limit   = (req.params.limit === 'undefined')? 10: req.params.limit;

    //query.select(['title', 'author.name', 'date']);
    query.populate('author', ['name']);
    query.limit(limit).desc('date');
    query.run(function(err, doc) {
        if(err) {
            console.log("ERROR: ", err);
            return;
        }
        if(!doc) {
            console.log("ERROR: ", "not found");
            return;
        }
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
exports.getSearchPromises = function(req, res) {
    var Promise = db.model('promises'),
        query   = Promise.find({}),
        limit   = (req.params.limit === 'undefined')? 10: req.params.limit;

    //query.select(['title', 'author.name', 'date']);
    query.populate('author', ['name']);
    query.limit(limit).desc('date');
    query.run(function(err, doc) {
        if(err) {
            console.log("ERROR: ", err);
            return;
        }
        if(!doc) {
            console.log("ERROR: ", "not found");
            return;
        }
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

exports.makePromise = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
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
            res.json({
                status: "success",
                message: "redirect",
                location: "/look/" + doc._id
            });
        });
    }
}

exports.getJoinPromise = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.findById(req.params.id);

    query.run(function(err, doc) {
        if(err) {
            res.json({
                status: "error",
                message: "connection error"
            });
            return;
        }
        if(!doc) {
            res.json({
                status: "error",
                message: "data is not found"
            });
            return;
        }
        console.log(doc.joins);
        res.json(doc.joins);
    });
}
exports.pushJoinPromise = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
        var Promise = db.model('promises'),
            Join    = db.model('join');

        Promise.findById(req.params.id, function(err, doc) {
            if(err) {
                res.json({
                    status: "error",
                    message: "connection error"
                });
                return;
            }
            if(!doc) {
                res.json({
                    status: "error",
                    message: "data is not found"
                });
                return;
            }
            var join = new Join();
            
            join.user = req.user._id;
            join.information.name = req.user.name;
            join.information.email = req.user.login;
            //join.information.phone = ;
            //join.information.password = ;
            //join.information.party = ;
            //join.information.homepage = ;
            join.information.message = "hello world";
            doc.joins.push(join);

            doc.save(function(err, doc) {
                if(err) {
                    console.log("ERROR: ", err);
                    res.json({
                        status: "error",
                        message: "connection error"
                    });
                    return;
                }
                if(!doc) {
                    console.log("ERROR: ", "not found");
                    res.json({
                        status: "error",
                        message: "data not found"
                    });
                    return;
                }
                res.json({
                    status: "success"
                });
                console.log("DATA: ", util.inspect(doc));
            });
        });
    }
}
exports.pullJoinPromise = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
    }
}

exports.getCheerPromise = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.findById(req.params.id);

    query.populate('cheers.user', ['name']);
    query.run(function(err, doc) {
        if(err) {
            res.json({
                status: "error",
                message: "connection error"
            });
            return;
        }
        if(!doc) {
            res.json({
                status: "error",
                message: "data is not found"
            });
            return;
        }
        console.log(doc.cheers);
        res.json(doc.cheers);
    });
}
exports.pushCheerPromise = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
        var Promise = db.model('promises'),
            Cheer   = db.model('cheer');

        Promise.findById(req.params.id, function(err, doc) {
            if(err) {
                res.json({
                    status: "error",
                    message: "connection error"
                });
                return;
            }
            if(!doc) {
                res.json({
                    status: "error",
                    message: "data is not found"
                });
                return;
            }
            var cheer = new Cheer();
            
            cheer.user = req.user._id;
            doc.cheers.push(cheer);

            doc.save(function(err, doc) {
                if(err) {
                    console.log("ERROR: ", err);
                    res.json({
                        status: "error",
                        message: "connection error"
                    });
                    return;
                }
                if(!doc) {
                    console.log("ERROR: ", "not found");
                    res.json({
                        status: "error",
                        message: "data not found"
                    });
                    return;
                }
                res.json({
                    status: "success"
                });
                console.log("DATA: ", util.inspect(doc));
            });
        });
    }
}
exports.pullCheerPromise = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
    }
}

exports.getComments = function(req, res) {
    var Promise     = db.model('promises'),
        query       = Promise.findById(req.params.id);

    query.populate('comments.author', ['name']);
    query.run(function(err, doc) {
        if(err) {
            res.json({
                status: "error",
                message: "connection error"
            });
            return;
        }
        if(!doc) {
            res.json({
                status: "error",
                message: "data is not found"
            });
            return;
        }
        console.log(doc.comments);
        res.json(doc.comments);
    });
}
exports.writeComment = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
        var Promise = db.model('promises'),
            Comment = db.model('comment');

        Promise.findById(req.params.id, function(err, doc) {
            if(err) {
                res.json({
                    status: "error",
                    message: "connection error"
                });
                return;
            }
            if(!doc) {
                res.json({
                    status: "error",
                    message: "data is not found"
                });
                return;
            }
            var comment = new Comment();
            
            comment.author = req.user._id;
            comment.body = req.body.body;
            doc.comments.push(comment);

            doc.save(function(err, doc) {
                if(err) {
                    console.log("ERROR: ", err);
                    res.json({
                        status: "error",
                        message: "connection error"
                    });
                    return;
                }
                if(!doc) {
                    console.log("ERROR: ", "not found");
                    res.json({
                        status: "error",
                        message: "data not found"
                    });
                    return;
                }
                res.json({
                    status: "success"
                });
                console.log("DATA: ", util.inspect(doc));
            });
        });
    }
}
exports.deleteComment = function(req, res) {
    if(!req.loggedIn) {
        res.json({
            status: "error",
            message: "redirect",
            location: "/login"
        });
        return;
    } else {
    }
}


/***
 * User information Action below
 */
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
exports.people = function(req, res) {
    var People = db.model('people');

    People.find({}, function(err, people) {
      res.render('people', { people: people });
    });
}

exports.person = function(req, res) {
    var People = db.model('people');

    People.find({id: req.params.id}, function(err, person) {
      res.render('person', { person: person[0] });
    });
}