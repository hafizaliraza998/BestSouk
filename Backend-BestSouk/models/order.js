var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    name: {
        type: String,
    },
     
    img: {
        type: String,
    },
    price: {
        type: Number,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    
 
});

module.exports = mongoose.model('orders', OrderSchema);