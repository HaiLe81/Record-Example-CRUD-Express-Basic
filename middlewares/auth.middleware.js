var db = require('../db');

module.exports = {
    requireAuth: (req, res, next) => {
        if(!req.signedCookies.userId) {
            res.redirect('/auth/login');
            return;
        }

        let user = db.get('ListAccout').find({ id: req.signedCookies.userId }).value();
        if(!user) {
            res.redirect('/auth/login');
            return;
        }

        let sessionId = req.signedCookies.sessionId;
        let countsp = db
        .get('Sessions')
        .find({ id: sessionId })
        .get('cart')
        .size()
        .value();
        res.locals.countCart = countsp;

        // get count a productID
        let detail = db.get('Sessions').find({ id: sessionId }).get('cart').value();

        res.locals.productDetail = detail;

        res.locals.user = user;

        next();
    }
};