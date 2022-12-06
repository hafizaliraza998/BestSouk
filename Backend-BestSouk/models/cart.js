var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CartSchema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
     
    img: {
        type: String,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        default: 'cart',
    },
});

module.exports = mongoose.model('cart', CartSchema);