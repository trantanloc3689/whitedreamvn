var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Category = new Schema({
    title: String,
},{collection : 'categories'});

module.exports = mongoose.model('categories', Category);