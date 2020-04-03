var db = require('../db');

var shortid = require('shortid');

module.exports = {
    get: (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let perPage = 6;

        let start = (page - 1) * perPage;
        let end = page * perPage;
        res.render('products/product', {
            listPro: db.get('Products').value().slice(start, end),
            fullListPro: db.get('Products').value()
        });
    }
}