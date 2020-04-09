// var db = require('../db');
var Auth = require('../models/auth.model');
var Cart = require('../models/cart.model');

module.exports = {
    requireAuth: async function(req, res, next) {
        if (!req.signedCookies.userId) {
            res.redirect('/auth/login');
            return;
        }
        // console.log('signedCookies>>', req.signedCookies.userId)
        // let user = db.get('ListAccout').find({ id: req.signedCookies.userId }).value();
        await Auth.findOne({ _id: req.signedCookies.userId })
        .then((user) => {
            // console.log('run 1', user)
            if (!user) {
                res.redirect('/auth/login');
                return;
            }
            var a = user
            res.locals.user = user;
        })
        
        let sessionId = req.signedCookies.sessionId;

        await Cart.findOne({ sessionId: sessionId })
        .then((doc) => {
            if (doc === null) {
                let countsp = 0;
                res.locals.countCart = countsp;
            } else {
                let countsp = doc.cart.length;
                // console.log('count?>>', countsp)
                res.locals.countCart = countsp;
            }
        })

        // let countsp = db
        // .get('Sessions')
        // .find({ id: sessionId })
        // .get('cart')
        // .size()
        // .value();
        // res.locals.countCart = countsp;

        // get count a productID
        // let detail = db.get('Sessions').find({ id: sessionId })
        // .get('cart').value();


        // res.locals.productDetail = detail;

        // res.locals.user = user;

        next();
    }
};