
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
    { name: 'Jimmy', age: 45 },
    { name: '주향', age: 25 },
    { name: '현제', age: 24 },
    { name: '성준', age: 24 },
];

exports.people = function(req, res){
    res.render('people', { people: people });
};

exports.person = function(req, res){
    res.render('person', { person: people[req.params.id-1] });
};