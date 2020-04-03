var db = require('../db');

module.exports =  {
    addToCart: (req, res, next) => {
        // get productID
        var productId = req.params.productId;
        // get sessionId
        var sessionId = req.signedCookies.sessionId;

        if(!sessionId) {
            res.redirect('/products');
            return;
        }

        var count = db
        .get('Sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)

        db.get('Sessions').find({ id: sessionId })
        .set('cart.' + productId, count+1)
        .write()
        res.redirect('/products');
    }
}