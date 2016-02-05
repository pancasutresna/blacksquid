var path = require('path');

module.exports = function() {
    var client = './client/';
    var clientApp = client + 'app/';
    var server = './server/';
    var dist = './dist/';
    var temp = './tmp/';

    var config  = {
        dist: dist,
        css: client + 'css/style.css',
        /*
         * File paths
         */
        // all js to vet
        allJs: [
            client + '**/*.js',
            server + '**/*.js',
            './*.js',
            '!' + client + 'vendor/**/*.js'
        ],
        assets: [
            client + '**/*.*',
            '!' + client + '**/*.jade',
            '!' + client + 'vendor/**/*.*',
            '!' + client + 'sass/*.scss',
            '!' + client + 'css/*.css',
            '!' + clientApp + '**/*.spec.js'
        ],
        build: './build/',
        client: client,
        server: server,
        temp: temp,
        fonts: client + 'vendor/font-awesome/fonts/**/*.*',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        sass: client + 'sass/**/*.scss',
        jade: [
            client + '**/*.jade'
        ],
        /**
         * template cahce
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
        /**
         * Bower and NPM location
         */
        bower: {
            json: require('./bower.json'),
            directory: './client/vendor/',
            ignorePath: '..'
        },
        /**
         * Node settings
         */
        defaultPort: 3030,
        nodeServer: './bin/www',
        rootPath: path.normalize(__dirname + '/../../')
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};
