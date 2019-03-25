var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Order = new Schema({
    username: String,
    phone_number: String,
    address: String,
    products: [{
        name: String,
        price: Number,
        img_url: String,
        qty: Number,
        total: Number
    }],
    total_price: String,
    status: {
        type: Number,
        default: 0
    }, // 0 - đang chờ duyêt, 1 - đã duyệt
},{collection : 'orders'});

module.exports = mongoose.model('orders', Order);