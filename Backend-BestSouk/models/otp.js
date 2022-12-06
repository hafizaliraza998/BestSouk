var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var otpSchema = new Schema({
    email: {
        type: String,
    },
     
    otp: {
        type: String,
    },
    expireIn: {
        type: Number,
    },
});

module.exports = mongoose.model('Otp', otpSchema);