var Product = require('../../models/product.model');

module.exports = {
    get: async function (req, res) {
        try {
            await Product.find()
                .then((products) => {
                    // console.log('products:', products)
                    res.json(products);
                })
        } catch (error) {
            console.log(error)
        }
    },
    create: async (req, res) => {
        try {
            await Product.create(req.body)
                .then(product => {
                    res.json(product)
                })
        } catch (error) {
            console.log(error)
        }
    }
}