var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Order = new Schema({
    username: String,
    phone_number: String,
    address: String,
    products: [{
        type: String
    }],
    total_price: Number,
    status: Number, // 0 - đang chờ duyêt, 1 - đã duyệt
},{collection : 'orders'});

module.exports = mongoose.model('orders', Order);