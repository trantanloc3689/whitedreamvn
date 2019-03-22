var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Notifies = new Schema({
    title: String,
    status: Number,
},{collection : 'notifies'});

module.exports = mongoose.model('notifies', Notifies);