var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: String,
    description: String,
    // rate: Number,
    price: Number,
    size: [{
        type: String,
    }], 
    color: [{
        type: String
    }],
    img_url: [{
        type: String
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        rel: 'Category'
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('products', Product);