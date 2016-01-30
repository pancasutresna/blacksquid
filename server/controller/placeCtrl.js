var Place = require('mongoose').model('Place');

exports.getPlaces = function(req, res){
    Place.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.getPlaceById = function(req, res){
    Place.findOne({_id:req.params.id}).exec(function(err, place){
        res.send(place);
    });
};
