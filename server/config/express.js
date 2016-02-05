var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var http = require('http');

module.exports = function(app, config) {
    var oneDay = 86400000;
    /*
     *  DEV Mode
     *  //TODO: Create swither between dev and production mode
     */
    switch (config.environment) {
    case 'development':
        console.log('** PRODUCTION **');
        app.use('/', express.static(path.join(config.rootPath, 'build')));
        break;
    default:
        console.log('** DEVELOPMENT **');
        app.use('/', express.static(path.join(config.rootPath, 'client'), {maxAge: oneDay}));
        app.use('/', express.static('./'));
        break;
    }

    app.set('views', config.rootPath + 'client');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({
        secret: 'take over the world',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(sassMiddleware({
    //     src: path.join(config.rootPath, '/client/sass'),
    //     dest: path.join(config.rootPath, '/client/css'),
    //     outputStyle: 'compressed',
    //     prefix: '/css',
    //     debug: true
    // })
    // );

    
};
