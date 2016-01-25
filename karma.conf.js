// Karma configuration
// Generated on Fri Jan 22 2016 09:26:24 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    'plugins': [
        'karma-mocha',
        'karma-chai',
        'sinon-chai',
        'karma-jasmine',
        'karma-coverage',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-ie-launcher'
    ],
    frameworks: ['mocha', 'chai', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/vendor/angular/angular.js',
        'public/vendor/angular-resource/angular-resource.js',
        'public/vendor/angular-mocks/angular-mocks.js',
        'public/vendor/toastr/toastr.js',
        'test/test-app.js',
        'public/app/**/*.js',
        'test/specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'public/app/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      // output coverage reports
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: [],
    browsers: ['PhantomJS', 'Chrome', 'Chrome_without_security', 'IE9', 'IE8', 'IE_no_addons','Firefox', 'FirefoxAutoAllowGUM'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // you can define custom flags
    customLaunchers: {
        Chrome_without_security: {
            base: 'Chrome',
            flags: ['--disable-web-security']
        },
        IE9: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        },
        IE8: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE8'
        },
        IE_no_addons: {
            base:  'IE',
            flags: ['-extoff']
        },
        FirefoxAutoAllowGUM: {
            base: 'Firefox',
            prefs: {
                'media.navigator.permission.disabled': true
            }
        }
    }
  })
}
