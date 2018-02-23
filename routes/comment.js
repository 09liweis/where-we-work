var express = require('express');
var router = express.Router();

const Comment = require('../models/comment');

/* GET users with work place. */
router.get('/', function(req, res, next) {
    Comment.find({}).exec((err, comments) => {
        if (err) throw err;
        res.send(comments);
    });
});

router.post('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    const name = req.body.name;
    const content = req.body.content;
    const comment = Comment({
        name: name,
        content: content
    });
  
    comment.save(function(err) {
        if (err) throw err;
        res.send(comment);
    });
});

module.exports = router;
