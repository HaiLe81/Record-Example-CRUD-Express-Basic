var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    sessionId: String,
    cart: [{ productId: String, count: Number }]
});

var Cart = mongoose.model('Sessions', cartSchema, "Sessions");
module.exports = Cart;