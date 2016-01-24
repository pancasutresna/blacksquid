var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    title: {
        type: String,
        required: '{PATH} is required!'
    },
    featured: {
        type: Boolean,
        required: '{PATH} is required!'
    },
    published: {
        type: Date,
        required: '{PATH} is required!'
    },
    tags: [String]
});

var Place = mongoose.model('Place', placeSchema);

function createDefaultPlaces(){
    Place.find({}).exec(function(err, collection){
        if(collection.length === 0){
            Place.create({title: 'Place 1', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 2', featured: false, published: new Date('1/1/2014'), tags: ['tag2']});
            Place.create({title: 'Place 3', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 4', featured: true, published: new Date('1/1/2014'), tags: ['tag1', 'tag2', 'tag3']});
            Place.create({title: 'Place 5', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 6', featured: true, published: new Date('1/1/2014'), tags: ['tag3']});
            Place.create({title: 'Place 7', featured: false, published: new Date('1/1/2014'), tags: ['tag3']});
            Place.create({title: 'Place 8', featured: true, published: new Date('1/1/2014'), tags: ['tag3']});
            Place.create({title: 'Place 9', featured: false, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 10', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 11', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 12', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
            Place.create({title: 'Place 13', featured: true, published: new Date('1/1/2014'), tags: ['tag1']});
        }
    });
}

exports.createDefaultPlaces = createDefaultPlaces;
