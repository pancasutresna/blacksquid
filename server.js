var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport.js')();
require('./server/config/routes')(app);
require('./server/config/errors')(app);

module.exports = app;
module.exports.config = config;
