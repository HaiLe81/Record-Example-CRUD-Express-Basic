var db = require('../db');

var shortid = require('shortid');

module.exports = {
    index: (req, res) => {
        res.render('users/index', {
            FreeLaHuflit: db.get('FreeLaHuflit').value()
        });
    },
    search: (req, res) => {
        let q = req.query.q;
        let matchedUsers = db.get('FreeLaHuflit').value().filter((user) => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
        
        res.render('users/index', {
            FreeLaHuflit: matchedUsers
        })
    },
    create: (req, res) => {
        res.render('users/create')
    },
    get: (req, res) => {
        // var id = parseInt(req.params.id);
        var id = req.params.id;
    
        // console.log(typeof id)
        var FreeLaHuflit = db.get('FreeLaHuflit').find({ id: id }).value();
    
        res.render('users/view', { 
            FreeLaHuflit: FreeLaHuflit
        });
    },
    post: (req, res) => {
        req.body.id = shortid.generate();

        db.get('FreeLaHuflit').push(req.body)
        .write();
        res.redirect('/users')
    }
}