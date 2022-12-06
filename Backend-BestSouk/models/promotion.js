var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proSchema = new Schema({
    description: {
        type: String,
    },
     
    sender: {
        type: String,
    },
    title: {
        type: String,
    },
    receiver: {
        type: String,
    },
});

module.exports = mongoose.model('promotions', proSchema);