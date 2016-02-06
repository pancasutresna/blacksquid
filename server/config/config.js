var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

    development: {
        db: 'mongodb://localhost/blacksquid',
        port: process.env.PORT || 3030,
        rootPath: rootPath,
        environment: 'development'
    },
    production: {
        // db: 'mongodb://panca_sutresna:blacksquid1029#*@ds045795.mongolab.com:45795/blacksquid',
        db: 'mongodb://localhost/blacksquid',
        // port: process.env.PORT || 80,
        port: process.env.PORT || 3030,
        rootPath: rootPath,
        environment: 'production'
    }
};
