var mongoose = require('mongoose');
var userModel = require('../model/User');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error ....'));
    db.once('open', function callback(){
        console.log('Database is ready and opened....');
    });

    userModel.createDefaultUsers();
}
