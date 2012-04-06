
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {});
};

/*
 * GET people.
 */
 people = [
    { name: 'Paul', age: 28 },
    { name: 'Jane', age: 26 },
    { name: 'Jimmy', age: 45 }
];

exports.people = function(req, res){
    res.render('people', { people: people });
};

exports.person = function(req, res){
    res.render('person', { person: people[req.params.id-1] });
};