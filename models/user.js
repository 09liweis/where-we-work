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

userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;