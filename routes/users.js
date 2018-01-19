var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function(req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
