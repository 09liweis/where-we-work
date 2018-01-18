var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    res.send(req.body);
});

module.exports = router;
