var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongodb;
if (process.env.C9_USER) {
    mongodb = 'mongodb://' + process.env.IP + '/where_we_work';
} else {
    mongodb = 'mongodb://heroku_w04hmq79:8khn5l6ui7745rlpsi1dmg61d9@ds239368.mlab.com:39368/heroku_w04hmq79';
}
//use production
// mongodb = 'mongodb://heroku_w04hmq79:8khn5l6ui7745rlpsi1dmg61d9@ds239368.mlab.com:39368/heroku_w04hmq79';
mongoose.connect(mongodb);

var index = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comment');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/comments', comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
