var auth = require('./auth');
var userCtrl = require('../controller/userCtrl');
var placeCtrl = require('../controller/placeCtrl');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app){

     app.get('/api/users', auth.requiresRole('admin'), userCtrl.getUsers);
     // test comment
     app.post('/api/users', userCtrl.createUser);
     app.put('/api/users', userCtrl.updateUser);

     app.get('/api/places', placeCtrl.getPlaces);
     app.get('/api/places/:id', placeCtrl.getPlaceById);

    // Angular partials setup
    app.get('/partials/*', function(req, res){
        res.render('partials/' + req.params[0]);
    });

    app.post('/login',  auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    // handle all request to api, return 404 if requested through browsers
    app.all('/api/*', function(req, res){
        res.send(404);
    });

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

}
