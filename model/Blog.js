var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Blog = new Schema({
    name: String,
    title: String,
    meta_description: String,
    name_slug: String,
    summary: String,
    description: String,
    img_url: String,
    tag: String,
    created: {
        type: Date,
        default: Date.now
    }
},{collection : 'blogs'});

module.exports = mongoose.model('blogs', Blog);