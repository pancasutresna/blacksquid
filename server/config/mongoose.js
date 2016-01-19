var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error ....'));
    db.once('open', function callback(){
        console.log('Database is ready and opened....');
    });

    // Schema for basic user
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName: 'Panca', lastName: 'Sutresna', username: 'panca'});
            User.create({firstName: 'John', lastName: 'Doe', username: 'john'});
            User.create({firstName: 'Jane', lastName: 'Doe', username: 'jane'});
        }
    });
}
