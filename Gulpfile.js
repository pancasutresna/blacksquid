/**
 * Gulp configuration file
 * @type {[type]}
 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var runSequence = require('gulp-run-sequence');
var port = process.env.PORT || config.defaultPort;

var $ = require('gulp-load-plugins')({
    lazy: true
});

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
        .pipe(gulp.dest(config.client + '/css/'));
});

/**
 * Clean compiled stylesheets
 */
gulp.task('clean-styles', function() {
    var files = config.client + 'css/*.css';
    return clean(files);
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
gulp.task('inject', ['styles'], function() {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.jade)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {
            ignorePath: '/client/'
        }))
        .pipe($.inject(gulp.src(config.css), {
            ignorePath: '/client/'
        }))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        legacyWatch: true,
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
            })
            .on('crash', function() {
                log('### nodemon crashed: script crashed for some reason ###');
            })
            .on('exit', function() {
                log('### nodemon clean exit ###');
            });
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