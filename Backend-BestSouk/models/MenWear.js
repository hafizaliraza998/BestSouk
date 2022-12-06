var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MenWearSchema = new Schema({
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

module.exports = mongoose.model('MenWear', MenWearSchema);