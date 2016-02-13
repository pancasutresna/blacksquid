var path = require('path');

module.exports = function() {
    var client = './client/';
    var clientApp = client + 'app/';
    var report = './report/';
    var server = './server/';
    var dist = './dist/';
    var temp = './tmp/';
    var root = './';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var specRunnerFile = 'specs.html';

    var config  = {
        root: root,
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
        index: client + 'index.html',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        sass: client + 'sass/**/*.scss',
        report: report,
        jade: [
            client + '**/*.jade'
        ],
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        /**
         * Browser sync
         */
        browserReloadDelay: 1000,
        /**
         * template cahce
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: '/app'
            }
        },
        /**
         * Bower and NPM location
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testLibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [clientApp + '**/*.spec.js'],
        /**
         * Karma and testing settings
         */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntergrationSpecs: [
            client + 'tests/server-integration/**/*.spec.js'
        ],
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

    config.karma = getKarmaOptions();

    return config;

    ////////////////////////////////////////////////
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntergrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };

        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
};
