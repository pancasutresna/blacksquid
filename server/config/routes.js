var auth = require('./auth');
var userCtrl = require('../controller/userCtrl');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app){

     app.get('/api/users', auth.requiresRole('admin'), userCtrl.getUsers);

     app.post('/api/users', userCtrl.createUser);
     app.put('/api/users', userCtrl.updateUser);

    // Angular partials setup
    app.get('/partials/*', function(req, res){
        res.render('partials/' + req.params[0]);
    });

    app.post('/login',  auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

}
