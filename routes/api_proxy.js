var express = require('express');
var router = express.Router();
const https = require("https");


router.get('/toplist', function(req, res, next) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1';
    https.get(url, response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            res.send(body);
        });
    });
});


module.exports = router;
