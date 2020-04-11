var Product = require('../../models/product.model');

module.exports = {
    get: async function(req, res) {
        await Product.find()
        .then((products) => {
            // console.log('products:', products)
            res.json(products);
        })
    },
    create: async (req, res) => {
        await Product.create(req.body)
        .then(product => {
            res.json(product)
        })
    }
}