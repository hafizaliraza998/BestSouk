var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotiSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
notify: {
    type: Boolean,
    default: true,
},
status: {
    type: String,
    default: 'New',
},



});

module.exports = mongoose.model('notification', NotiSchema);