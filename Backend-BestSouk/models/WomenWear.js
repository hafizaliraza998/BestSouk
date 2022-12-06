var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WomenWearSchema = new Schema({
    images: {
        type: String,
        required: true
    },
     
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('WomenWear', WomenWearSchema);