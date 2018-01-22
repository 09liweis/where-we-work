var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    lat: Number,
    lng: Number,
    address: String,
    google_place_id: String,
    created_at: Date,
    updated_at: Date
});

placeSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var Place = mongoose.model('Place', placeSchema);
module.exports = Place;