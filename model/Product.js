var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: String,
    name_slug: String,
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
        ref: 'categories'
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('products', Product);
