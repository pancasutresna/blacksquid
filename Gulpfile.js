/**
 * Gulp configuration file
 */
var del         = require('del');
var gulp        = require('gulp');
var args        = require('yargs').argv;
var browserSync = require('browser-sync');
var config      = require('./gulp.config')();
var runSequence = require('gulp-run-sequence');
var port        = process.env.PORT || config.defaultPort;
var $           = require('gulp-load-plugins')({ lazy: true });

/* ===========================================================================
 * Display all avaiable gulp tasks
 * =========================================================================== */
gulp.task('help', $.taskListing.withFilters(/:/));

/* ===========================================================================
 * Perform default task when only 'gulp' command specified 
 * without task actions, which is calling the 'gulp help' command
 * =========================================================================== */
gulp.task('default', ['help']);

/* ===========================================================================
 * Run source code analyzer based on jshint and jscs specification files
 * jshint using .jshintrc
 * jscs using .jscsrc
 * find those files in the project root directory
 * =========================================================================== */
gulp.task('inspect', function() {
    log($.util.colors.yellow('### TASK INSPECT ###'));
    log($.util.colors.yellow('Analyzing and inspect source code with based on JSHint and JSCS configuration files'));
    
    return gulp
        .src(config.allJs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs()) // jscs check
        .pipe($.jshint()) // jshint check
        .pipe($.jshint.reporter(
            'jshint-stylish', {
                verbose: true
            }
        ))
        .pipe($.jshint.reporter('fail'));
});

/* ===========================================================================
 * This task will run 'clean-fonts' to remove previously coppied fonts inside 
 * the build folder then copy a fresh new fonts from bower_components into 
 * build folder
 * ===========================================================================*/
gulp.task('fonts', ['clean-fonts'], function() {
    log($.util.colors.yellow('### TASK FONTS ###'));
    log($.util.colors.yellow('Copy a fresh new fonts into build folders'));

    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

/* ===========================================================================
 * This task will run 'clean-images' to remove previously coppied images inside 
 * the build folder then copy a fresh new images and perform compression to 
 * certain optimization level
 * =========================================================================== */
gulp.task('images', ['clean-images'], function() {
    log($.util.colors.yellow('### TASK IMAGES ###'));
    log($.util.colors.yellow('Copy a fresh new images and perform compression'));

    return gulp.src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest(config.build + 'images'));    
});

/* ===========================================================================
 * This task will run 'clean-styles' to remove previously generated css files 
 * in the client folders then compile SCSS files into CSS, handle convertion errors 
 * and insert css prefixes to support major browsers
 * =========================================================================== */
gulp.task('styles', ['clean-styles'], function() {
    log($.util.colors.yellow('### TASK STYLES ###'));
    log($.util.colors.yellow('Compilling SCSS to CSS and insert browser specific prefixes'));

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass.sync({ outputStyle: 'compressed' }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.client + '/css/'));
});

/* ===========================================================================
 * This task will run 'clean-code' to remove any generated templatecache in the 
 * tmp folder, then perform minify html, add them to the templatecache and put 
 * them in the tmp folder to used by the 'gulp optimize' task
 * =========================================================================== */
gulp.task('templatecache', ['clean-code'], function() {
    log($.util.colors.yellow('### TASK TEMPLATECACHE ###'));
    log($.util.colors.yellow('Perform minify HTML and Creating AngularJS $templateCache'));

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true})) // perform minify html
        .pipe($.angularTemplatecache( // create AngularJS $templateCache
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

/* ===========================================================================
 * This task depends on 'styles' and 'templatecache' task before injecting 
 * bower components and custom script and css to 'index.html' file
 * =========================================================================== */
gulp.task('inject', ['styles', 'templatecache'], function() {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index) // specify the 'index.html' file to inject
        .pipe(wiredep(options)) // inject bower_components
        .pipe($.inject(gulp.src(config.js))) // inject custom scripts
        .pipe($.inject(gulp.src(config.css))) // inject custom css
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject'], function() {
    log('Optimizing the javascript, css and html');

    //var assets = $.useref.assets({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe($.useref(
            { 
                searchPath: './'
            }))
        .pipe(gulp.dest(config.build));
});

gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        //legacyWatch: true,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'development' : 'production',
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
            .on('restart', ['inspect'], function(ev) {
                log('### nodemon restarted ###');
                log('files changed on restart: \n' + ev);
            })
            .on('start', function() {
                log('### nodemon started ###');
                startBrowserSync();
            })
            .on('crash', function() {
                log('### nodemon crashed: script crashed for some reason ###');
            })
            .on('exit', function() {
                log('### nodemon clean exit ###');
            });
});

gulp.task('templates', function() {
    var YOUR_LOCALS = {};
    return gulp
            .src(config.client + '**/*.jade')
            .pipe($.jade({
                locals: YOUR_LOCALS,
                pretty: true
            }))
            .pipe(gulp.dest(config.client));
});


/* ###########################################################################
 * CLEAN SECTION
 * Task related to cleaning 
 * ########################################################################### */

/* ===========================================================================
 * Clean everything inside build and tmp folder
 * =========================================================================== */
gulp.task('clean', function() {
    log($.util.colors.yellow('### TASK CLEAN ###'));
    log($.util.colors.yellow('Cleaning build folders....'));

    var delConfig = [].concat(config.build, config.temp); //concat build and tmp folder
    del(delConfig);
});

/* ===========================================================================
 * Clean automatically generated html and javascript codes
 * inside build and tmp folders
 * =========================================================================== */
gulp.task('clean-code', function() {
    log($.util.colors.yellow('### TASK CLEAN-CODE ###'));
    log($.util.colors.yellow('Cleaning html and javascript codes....'));

    // define html and javascript files to clean
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );

    // call to clean function
    return clean(files); 
});

/* ===========================================================================
 * Clean automatically generated stylesheets inside tmp/css folder
 * =========================================================================== */
gulp.task('clean-styles', function() {
    log($.util.colors.yellow('### TASK CLEAN-STYLES ###'));
    log($.util.colors.yellow('Cleaning stylesheets....'));

    // define css files to clean
    var files = config.client + 'css/**/*.*';

    // call to clean function
    return clean(files);
});

/* ===========================================================================
 * Clean fonts inside build/fonts folder
 * =========================================================================== */
gulp.task('clean-fonts', function() {
    log($.util.colors.yellow('### TASK CLEAN-FONTS ###'));
    log($.util.colors.yellow('Cleaning fonts....'));

    // define font files to clean
    var files = config.build + 'fonts/**/*.*';

    // call to clean function
    return clean(files);
});

/* ===========================================================================
 * Clean images inside build/images folder
 * =========================================================================== */
gulp.task('clean-images', function() {
    log($.util.colors.yellow('### TASK CLEAN-IMAGES ###'));
    log($.util.colors.yellow('Cleaning images....'));

    // define images files to clean
    var files = config.build + 'images/**/*.*';

    // call to clean function
    return clean(files);
});

/* ###########################################################################
 * WATCH SECTION
 * Task related to watch 
 * ########################################################################### */

/* ===========================================================================
 * Perform watch on SCSS files to run specified task when code changes
 * =========================================================================== */
gulp.task('watch-scss', function() {
    log($.util.colors.yellow('### TASK WATCH-SASS ###'));
    log($.util.colors.yellow('Watching scss files....'));

    // perform watch and run 'styles' task when code changes
    gulp.watch([config.sass], ['styles']);
});


/**
 * Copy client related files into dist directory for production
 */
//gulp.task('build-client', ['inject'], function() {
//    return gulp
//        .src(config.assets)
//        .pipe(gulp.dest(config.dist));
//});

//TODO: remove empty directory
//gulp.task('clean-dist', function () {
//    var files = config.dist + '**/*.*';
//    return clean(files);
//});

/////////////////////////////

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    log('Starting browser-sync on port: ' + port);

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [config.client + '**/*.*'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

function clean(path) {
    log($.util.colors.yellow('Cleaning: ' + path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}