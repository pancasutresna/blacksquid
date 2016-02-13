// Karma configuration
// Generated on Fri Jan 22 2016 09:26:24 GMT+0000 (UTC)

module.exports = function(config) {

    var gulpConfig = require('./gulp.config')();

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
        //frameworks: ['jasmine'],

        files: gulpConfig.karma.files,
        exclude: gulpConfig.karma.exclude,
        proxies: {
            '/': 'http://localhost:8888'
        },
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: gulpConfig.karma.preprocessors,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: gulpConfig.karma.coverage.dir,
            reporters: gulpConfig.karma.coverage.reporters
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: [],
        browsers: [
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
        
    });
};
