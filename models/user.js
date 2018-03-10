var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    title: String,
    website: String,
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
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
    bcrypt.hash(this.password, 10, (err, hash) => {
        console.log(err);
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;