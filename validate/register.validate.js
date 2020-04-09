// var db = require('../db');

var Auth = require('../models/auth.model');

module.exports.postRegister = async function (req, res, next) {
    let errors = [];

    // db.get('ListAccout').value().filter((item) => {
    //     if (item.username === req.body.username) {
    //         errors.push('Username is exist.')
    //     }
    // })

    await Auth.find()
        .then((doc) => {
            doc.map(x => {
                if (x.username === req.body.username) {
                    errors.push('Username is exist.')
                }
            })
        })

    if (!req.body.username) {
        errors.push('Phone is required.')
    }

    if (!req.body.password) {
        errors.push('Password is required.')
    }

    if (!req.body.confirmpassword) {
        errors.push('Config password is required.')
    }

    if (req.body.password !== req.body.confirmpassword) {
        errors.push('Confirm password is not matched')
    }

    if (errors.length) {
        res.render('auth/register', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}
