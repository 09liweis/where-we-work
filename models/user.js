var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;