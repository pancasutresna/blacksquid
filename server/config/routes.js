var auth = require('./auth');
var userCtrl = require('../controller/userCtrl');
var placeCtrl = require('../controller/placeCtrl');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');

module.exports = function(app, config) {

    app.get('/api/users', auth.requiresRole('admin'), userCtrl.getUsers);
    // test comment
    app.post('/api/users', userCtrl.createUser);
    app.put('/api/users', userCtrl.updateUser);

    app.get('/api/places', placeCtrl.getPlaces);
    app.get('/api/places/:id', placeCtrl.getPlaceById);

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    // handle all request to api, return 404 if requested through browsers
    app.all('/api/*', function(req, res) {
        res.send(404);
    });

    app.get('/admin/*', function(req, res) {
        res.sendFile(path.join(config.rootPath, 'build/index.html'));
    });

    app.get('*', function(req, res) {
        console.log('PATH : ' + path.join(config.rootPath, 'build/index.html'));
        //switch (config.environment) {
       // case 'development':
              res.sendFile(path.join(config.rootPath, 'build/index.html'));
              
        //    break;
        //default:
            //res.sendFile(path.join(config.rootPath, 'client/index.html'));
        //    break;
        //}
        
    });

};
