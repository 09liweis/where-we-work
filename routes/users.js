var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Place = require('../models/place');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).select('name title').populate('place').exec((err, users) => {
      if (err) throw err;
      res.send(users);
  });
});

router.post('/login', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email, password: password}, (err, user) => {
        if (err) throw err;
        res.send(user);
    });
});

router.post('/signup', function(req, res, next) {
    const email = req.body.email;
    
    //check if email exist
    User.find({email: email}, (err, user) => {
        if (user) {
            res.send('User Exist');
        }
        if (err) throw err;
    });
    
    const password = req.body.password;
    
    const newUser = User({
        email: email,
        password: password
    });
    newUser.save(function(err) {
        if (err) throw err;
        res.send(newUser);
    });
    
});

router.get('/:id', function(req, res, next) {
    const userId = req.params.id;
    User.findOne({_id: userId}).populate('place').exec((err, user) => {
        if (err) throw err;
        res.send(user);
    });
});

router.post('/:id', async (req, res, next) => {
    const userId = req.params.id;
    const place = req.body.place;
    const userData = req.body.user;
    
    let p = await Place.findOne({google_place_id: place.google_place_id});
    if (!p) {
        p = Place(place);
        await p.save();
    } else {
        p.lat = place.lat;
        p.lng = place.lng;
        p.address = place.address;
        p.name = p.name;
        await p.save();
    }

    User.findOne({_id: userId}, (err, user) => {
        if (err) throw err;
        user.name = userData.name;
        user.title = userData.title;
        user.place = p._id;
        user.save(function(err) {
            if (err) throw err;
            res.send(user);
        });
    });
});

module.exports = router;
