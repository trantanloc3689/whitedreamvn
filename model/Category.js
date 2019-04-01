var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Category = new Schema({
    title: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }]
},{collection : 'categories'});

module.exports = mongoose.model('categories', Category);