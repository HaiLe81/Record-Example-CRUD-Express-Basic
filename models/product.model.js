var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Products = mongoose.model('Products', productSchema, "Products");
module.exports = Products;