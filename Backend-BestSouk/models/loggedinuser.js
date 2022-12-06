var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoggedInSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
     
});

module.exports = mongoose.model('loggedinuser', LoggedInSchema);