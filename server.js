var express = require('express');

// Define environment variables
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];

/**
 * Call expres configuraiton
 * @app
 * @config
 */
require('./server/config/express')(app, config);

/**
 * Call mongoose configuration
 * @config
 */
require('./server/config/mongoose')(config);

/**
 * Call passport configuration using local Strategy
 */
require('./server/config/passport.js')();

/**
 * Call routes configuration
 * @app
 */
require('./server/config/routes')(app);

/**
 * Call error handler
 * @app
 */
require('./server/config/errors')(app);

module.exports = app;
module.exports.config = config;
