var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProSchema = new Schema({
    name: {
        type: String,
    },
     
    img: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
});

module.exports = mongoose.model('products', ProSchema);