/**
 * Gulp configuration file
 * Author: panca@sutresna.com
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
        .pipe($.jscs())
        .pipe($.jshint())
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
    log($.util.colors.yellow('### TASK INJECT ###'));
    log($.util.colors.yellow('Injecting bower_components, custom scripts and css into index.html....'));

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index) // specify the 'index.html' file to inject
        .pipe(wiredep(options)) // inject bower_components
        .pipe($.inject(gulp.src(config.js))) // inject custom scripts
        .pipe($.inject(gulp.src(config.css))) // inject custom css
        .pipe(gulp.dest(config.client));
});

/* ===========================================================================
 * This task perform optimize build for production ready code, including
 * injection to all needed assets (javascript, css and template cache) created
 * during the build.
 * =========================================================================== */
gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
    log($.util.colors.yellow('### TASK OPTIMIZE ###'));
    log($.util.colors.yellow('Optimizing assets and injecting templateCache....'));

    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter(['**/*.css'], {restore: true});
    var jsLibFilter = $.filter(['**/' + config.optimized.lib], {restore: true});
    var jsAppFilter = $.filter(['**/' + config.optimized.app], {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'    // injecting templateCache into index.html
        }))
        .pipe($.useref({ searchPath: './' })) // look for the assets in this path
        .pipe(cssFilter) // filter css files only
        .pipe($.csso()) // minify css
        .pipe(cssFilter.restore) // restore css files to stream
        .pipe(jsLibFilter) // filter lib.js files only
        .pipe($.uglify())
        .pipe(jsLibFilter.restore) // restore to stream
        .pipe(jsAppFilter) // filter app.js files only
        .pipe($.ngAnnotate()) // inject
        .pipe($.uglify()) 
        .pipe(jsAppFilter.restore) // restore to stream
        .pipe(gulp.dest(config.build));
});

/* ===========================================================================
 * This task will start server and serve production ready optimized code
 * =========================================================================== */
gulp.task('serve-prod', ['optimize'], function() {
    log($.util.colors.yellow('### SERV PRODUCTION BUILD ###'));
    log($.util.colors.yellow('Serving production code....'));

    // pass the value of is development is true, 
    // mean it's production
    serve(false); 
});

/* ===========================================================================
 * This task will start server and serve development code
 * =========================================================================== */
gulp.task('serve-dev', ['inject'], function() {
    log($.util.colors.yellow('### SERV DEVELOPMENT BUILD ###'));
    log($.util.colors.yellow('Serving development code....'));

    // pass the value of is development is true
    serve(true); 
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

///////////////////////////////////////////////////////////

function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'development' : 'production',
        },
        watch: [config.server]
    };

    // watch nodemon states  and perform necessary action 
    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log($.util.colors.yellow('### NODEMON RESTARTED ###'));
            log($.util.colors.yellow('Files changed on restart: \n' + ev));

            setTimeout(function() {
                browserSync.notify('Reloading browser-sync....');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log($.util.colors.green('### NODEMON STARTED ###'));
            log($.util.colors.green('Restarting nodemon....'));

            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log($.util.colors.red('### NODEMON CRASHED ###'));
            log($.util.colors.red('Script crashed for some reason....'));
        })
        .on('exit', function() {
            log($.util.colors.green('### NODEMON EXITING ###'));
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.client + ')/' );
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Start browserSync
 * @return void
 */
function startBrowserSync(isDev) {
    var host = 'localhost:';

    // check if it's already running
    // and if there is --nosync command line parameter passed
    if (args.nosync || browserSync.active) {
        return;
    }

    if(isDev) {
        // watching sass files
        gulp.watch([config.sass], ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        // watching sass files
        gulp.watch([config.sass, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }


    var options = {
        proxy: host + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.sass
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: $.util.colors.yellow('### BROWSER-SYNC >>'),
        notify: true,
        reloadDelay: 0
    };

    log($.util.colors.yellow('Starting browser-sync on port: ' + port));

    browserSync(options);
}

/**
 * Delete path specified in the parameter
 * @param  path :path to clean
 * @return void
 */
function clean(path) {
    log($.util.colors.yellow('Cleaning: ' + path));
    del(path);
}

/**
 * Log helper function
 * @param String msg :messages to log
 * @return void
 */
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