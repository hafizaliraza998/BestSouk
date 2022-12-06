var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
     img: {
         type: String,
        // required: true,
       },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Customer', customerSchema);