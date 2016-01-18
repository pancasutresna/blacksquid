var express = require('express');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/errors')(app);

//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);

module.exports = app;
module.exports.config = config;
