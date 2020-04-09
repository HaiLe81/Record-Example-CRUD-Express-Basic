var md5 = require('md5');

var db = require('../db');

var shortid = require('shortid');

var Auth = require('../models/auth.model');


module.exports = {
    index: (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let perPage = 3;

        let start = (page - 1) * perPage;
        let end = page * perPage;

        res.render('users/index', {
            FreeLaHuflit: db.get('FreeLaHuflit').value().slice(start, end),
            fullFree: db.get('FreeLaHuflit').value()
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
        var arr = req.file.path.split('').slice(15)
        arr.splice(0, 0, "uploads/")
        var newArr = arr.join('')
        req.body.avatar = newArr;

        db.get('FreeLaHuflit').push(req.body)
            .write();
        res.redirect('/users')
    },
    changePassword: (req, res) => {
        res.render('users/changePassword')
    },
    postChangePassword:  (req, res) => {
        // update password 
        // let a = db.get('ListAccout').find({ id: req.signedCookies.userId })
        //     .assign({ password: md5(req.body.password) })
        //     .value()
        
        // update password
        Auth.findOne({ _id: req.signedCookies.userId }, async function(err, doc) {
            if(err){
                console.log(err)
            }

            if(doc === null){
                console.log('null')
            } else {
                doc.password = md5(req.body.password);
                doc.save()
            }
        })

        res.redirect('/users');
    }
}