var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Place = require('../models/place');

/* GET users with work place. */
router.get('/', function(req, res, next) {
  User.find({}).select('name title').populate('place').exec((err, users) => {
      if (err) throw err;
      res.send(users);
  });
});

//handle user login
router.post('/login', async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, (err, user) => {
        if (err) throw err;
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
            res.send(user);
        });
    });
});

router.post('/signup', async function(req, res, next) {
    const email = req.body.email;
    res.writeHead(200, {'Content-Type': 'application/json'});

    //check if email exist
    let user = await User.findOne({email: email});
    if (user) {
        return res.end(JSON.stringify({
            code: 300,
            message: 'User Exist.'
        }));
    }
    
    const password = req.body.password;
    const name = req.body.name;
    const title = req.body.title;
    const place = req.body.place;
    
    let p = await Place.findOne({google_place_id: place.google_place_id});

    try {
        if (!p) {
            p = Place(place);
            await p.save();
        } 
        // update place with latest google info
        else {
            p.lat = place.lat;
            p.lng = place.lng;
            p.address = place.address;
            p.name = p.name;
            await p.save();
        }
    } catch (err) {
        console.log(err.errmsg);
    }
    
    const newUser = User({
        email: email,
        password: password,
        name: name,
        title: title,
        place: p._id
    });
    newUser.save(function(err) {
        if (err) throw err;
        return res.end(JSON.stringify({
            code: 200,
            message: 'Sign up successfully',
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    title: newUser.title
                }
            }
        }));
    });
    
});

router.get('/:id', function(req, res, next) {
    const userId = req.params.id;
    User.findOne({_id: userId}).select('name title').populate('place', 'name').exec((err, user) => {
        if (err) throw err;
        res.send(user);
    });
});

router.post('/:id', async (req, res, next) => {
    const userId = req.params.id;
    const place = req.body.place;
    const userData = req.body.user;
    
    let p = await Place.findOne({google_place_id: place.google_place_id});

    try {
        if (!p) {
            p = Place(place);
            await p.save();
        } 
        // update place with latest google info
        else {
            p.lat = place.lat;
            p.lng = place.lng;
            p.address = place.address;
            p.name = p.name;
            await p.save();
        }
    } catch (err) {
        console.log(err.errmsg);
    }

    User.findOne({_id: userId}).select('name title').exec((err, user) => {
        if (err) throw err;
        user.name = userData.name;
        user.title = userData.title;
        user.place = p._id;
        User.update(user, function(err) {
            try {
                res.send(user);
            } catch (err) {
                if (err) throw err;
            }
        });
    });
});

module.exports = router;
