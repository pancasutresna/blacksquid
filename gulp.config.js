module.exports = function() {
    var client = './client/';
    var clientApp = client + 'app/';
    var server = './server/';
    var dist = './dist/';

    var config  = {

        temp: './tmp/',
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
        client: client,
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
         * Bower and NPM location
         */
        bower: {
            json: require('./bower.json'),
            directory: './client/vendor',
            ignorePath: '..'
        }
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
