var md5 = require('md5');
var db = require('../db');
var shortid = require('shortid');

module.exports = {
    login: (req, res) => {
        res.render('auth/login');
    },
    postLogin: (req, res) => {
        
        let username = req.body.username;
        let password = req.body.password;

        let user = db.get('ListAccout').find({ username: username }).value();

        if (!user) {
            res.render('auth/login', {
                errors: [
                    'Users does not exists.'
                ],
                values: req.body
            });
            return;
        }

        var hashedPassword = md5(password);

        if (user.password !== hashedPassword) {
            res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
            });
            return;
        }

        res.cookie('userId', user.id, {
            signed: true
        })

        res.redirect('/users');
    },
    postLogOut: (req, res) => {
        res.clearCookie('userId', {
            path: '/'
        })
        res.redirect('/auth/login');
    },
    register: (req, res) => {
        res.render('auth/register');
    },
    postRegister: (req, res) => {
        // req.body.id = shortid.generate();

        db.get('ListAccout').push({
            id: shortid.generate(),
            username: req.body.username,
            password: md5(req.body.password)
        })
            .write();

        res.redirect('/users/login')
    }
}