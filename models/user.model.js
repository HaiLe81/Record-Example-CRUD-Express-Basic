var mongoose = require('mongoose');

var huflitSchema = new mongoose.Schema({
    name: String,
    phone: String,
    age: String,
    avatart: String
});

var Huflit = mongoose.model('FreeLaHuflit', huflitSchema, "FreeLaHuflit");
module.exports = Huflit;