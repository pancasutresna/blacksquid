var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        console.log('username is :' + username);
        User.findOne({username: username}).exec(function(err, user){
            if(user && user.authenticate(password)){
                console.log('find a user');
                return done(null, user);
            } else {
                console.log('cannot find a user');
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});


require('./server/config/routes')(app);
require('./server/config/errors')(app);

//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);

module.exports = app;
module.exports.config = config;
