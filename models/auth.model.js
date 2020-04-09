var mongoose = require('mongoose');

var authSchema = new mongoose.Schema({
    username: String,
    password: String
});

var Auth = mongoose.model('ListAccout', authSchema, "ListAccout");
module.exports = Auth;