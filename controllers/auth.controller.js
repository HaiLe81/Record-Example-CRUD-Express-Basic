var md5 = require('md5');
// var db = require('../db');
// var shortid = require('shortid');
var Auth = require('../models/auth.model');

module.exports = {
    login: (req, res) => {
        res.render('auth/login');
    },
    postLogin: (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;

            // let user = db.get('ListAccout').find({ username: username }).value();
            Auth.findOne({ username: username }).then((user) => {
                // console.log('user', user)
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
                res.cookie('userId', user._id, {
                    signed: true
                })

                res.redirect('/users');
                return user;
            })
        } catch (error) {
            console.log(error)
        }
        // if (!user) {
        //     res.render('auth/login', {
        //         errors: [
        //             'Users does not exists.'
        //         ],
        //         values: req.body
        //     });
        //     return;
        // }

        // var hashedPassword = md5(password);

        // if (user.password !== hashedPassword) {
        //     res.render('auth/login', {
        //         errors: [
        //             'Wrong password.'
        //         ],
        //         values: req.body
        //     });
        //     return;
        // }

        // res.cookie('userId', user.id, {
        //     signed: true
        // })

        // res.redirect('/users');
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
    postRegister: async function (req, res) {
        // req.body.id = shortid.generate();

        // db.get('ListAccout').push({
        //     id: shortid.generate(),
        //     username: req.body.username,
        //     password: md5(req.body.password)
        // })
        // .write();

        try {
            var newAcc = new Auth({
                username: req.body.username,
                password: md5(req.body.password)
            })
            await newAcc.save().then(() => {
                console.log('Register Success')
            })
    
            res.redirect('/users/login')
        } catch(error) {
            console.log(error)
        }
    }
}