var Place = require('mongoose').model('Place');

exports.getPlaces = function(req, res){
    Place.find({}).exec(function(err, collection){
        console.log(collection);
        res.send(collection);
    });
};
