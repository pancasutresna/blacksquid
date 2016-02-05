/**
 * Gulp configuration file
 * @type {[type]}
 */
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var runSequence = require('gulp-run-sequence');
var port = process.env.PORT || config.defaultPort;

var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
/**
 * Run source code analyzer
 */
gulp.task('vet', function() {
    log($.util.colors.yellow('Analyzing source code with JSHint and JSCS'));
    return gulp
        .src(config.allJs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

/**
 * Copy fonts into build folder 
 */
gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');

    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Copy images into build folder and perform 
 * compression to certain optimiation level
 */
gulp.task('images', ['clean-images'], function() {
    log('Copying and compressing images');

    return gulp.src(config.images)
        .pipe($.imagemin(
                {
                    optimizationLevel: 4
                }
            )
        )
        .pipe(gulp.dest(config.build + 'images'));    
});

/**
 * Compile SASS into CSS, handle error and insert css prefixes
 */
gulp.task('styles', ['clean-styles'], function() {
    log($.util.colors.yellow('Compilling SCSS --> CSS'));

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass.sync({
                outputStyle: 'compressed'
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.temp + '/css/'));
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

/**
 * Clean anythings inside build folder
 */
gulp.task('clean', function(done) {
    var delConfig = [].concat(config.build, config.temp);
    log('Clean anythings inside build folders: ' + $.util.colors.yellow(config.build));
    del(delConfig, done);
});

/**
 * Clean automatically generated html and javascript codes
 * inside temp and build folders
 */
gulp.task('clean-code', function() {
    log('Clean automatically generated html and javascript codes');

    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );

    return clean(files);
});

/**
 * Clean generated stylesheets in build/css folder
 */
gulp.task('clean-styles', function() {
    log('Cleaning stylesheets');

    return clean(config.temp + 'css/**/*.*');
});

/**
 * Clean fonts in build/fonts folder
 */
gulp.task('clean-fonts', function() {
    log('Cleaning fonts');

    return clean(config.build + 'fonts/**/*.*');
});

/**
 * Clean images in build/images folder
 */
gulp.task('clean-images', function(done) {
    log('Cleaning images');

    return clean(config.build + 'images/**/*.*', done);
});

/**
 * Add SASS wather
 */
gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});

/**
 * Inject bower components and custome assets
 */
gulp.task('inject', ['styles', 'templatecache'], function() {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe($.inject(gulp.src(config.css)))
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
            .on('restart', ['vet'], function(ev) {
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