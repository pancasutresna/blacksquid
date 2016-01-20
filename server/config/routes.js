var auth = require('./auth');

module.exports = function(app){
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
        res.render('index');
    });

}
