var express = require('express');
//var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(sassMiddleware({
    src: path.join(__dirname, '/server/views/sass'),
    dest: path.join(__dirname, '/public/css'),
    outputStyle: 'compressed',
    prefix: '/css',
    debug: true
    })
);

app.use(express.static(path.join(__dirname, 'public')));

if(env == 'development'){
    mongoose.connect('mongodb://localhost/blacksquid');
} else {
    mongoose.connect('mongodb://panca_sutresna:blacksquid1029#*@ds045795.mongolab.com:45795/blacksquid');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error ....'));
db.once('open', function callback(){
    console.log('Database is ready and opened....');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);

// Angular partials setup
app.get('/partials/*', function(req, res){
    res.render('partials/' + req.params[0]);
});

app.get('*', function(req, res){
    res.render('index');
});

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// var port = 3030;
// app.listen(port);
// console.log('Listening on port ' + port + '....');
