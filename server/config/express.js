var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var passport = require('passport');

module.exports = function(app, config){
    app.set('views', config.rootPath + '/server/views');
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
    app.use(sassMiddleware({
        src: path.join(config.rootPath, '/server/views/sass'),
        dest: path.join(config.rootPath, '/public/css'),
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true
        })
    );

    app.use(express.static(path.join(config.rootPath, 'public')));
}
