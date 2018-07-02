'use strict';
var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')({lazy: true});
var sassLint = require('gulp-sass-lint');
var tsify = require('tsify');
var del = require('del');
var tsProject = ts.createProject('tsconfig.json');
//var sassImportOnce = require('gulp-sass-import-once');
var settings = require('./gulp.settings/settings');

gulp.task('clean-styles', function (done) {
    var files = settings.app.cssFile + '*.css';
    clean(files, done);
});

gulp.task('code-check', function () {
    return gulp.src(settings.app.allTSs)
        .pipe($.tslint({
            formatter: "verbose"
        }))
        .pipe($.tslint.report());
});

gulp.task('lint-sass', ['clean-styles'], function () {
    return gulp.src(settings.app.scssStyles)
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml'
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('test-run', function (done) {
    runTests(done);
});

gulp.task('copy-other-resources', function () {
    msg('Kopiowanie dododatkowych plików aplikacji');
    return gulp.src(settings.app.otherAppResources)
        .pipe(gulp.dest(settings.build.path));
});

gulp.task('copy-app-assets', function () {
    msg('Kopiowanie assetów aplikacji');
    return gulp.src(settings.app.assets)
        .pipe(gulp.dest(settings.build.buildAssets));
});

gulp.task('sass-compile', ['lint-sass'], function () {
    msg('Kompilacja plików scss -> css');
    return gulp.src(settings.app.scssFile)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(settings.app.cssFile));
});

gulp.task('run-dev', [], function () {
    serve(true);
});

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('sass-watcher', function () {
    gulp.watch(settings.app.scssStyles, ['sass-compile']);
});

gulp.task('compile-remote-tests', [], function () {
    return browserify({
        entries: [settings.tests.tsFile],
        debug: true
    }).plugin(tsify)
        .bundle()
        .pipe(source(settings.tests.compiledJS))
        .pipe(gulp.dest('./'));
});

gulp.task('compile-maps-tests', [], function () {
    return browserify({
        entries: [settings.tests.tsFileMaps],
        debug: true
    }).plugin(tsify)
        .bundle()
        .pipe(source(settings.tests.compiledMapsJS))
        .pipe(gulp.dest('./'));
});

gulp.task('compile-misc-tests', [], function () {
    return browserify({
        entries: [settings.tests.tsFileMisc],
        debug: true
    }).plugin(tsify)
        .bundle()
        .pipe(source(settings.tests.compiledMiscJS))
        .pipe(gulp.dest('./'));
});

gulp.task('ts-compile', ['code-check', 'copy-other-resources', 'copy-app-assets'], function () {
    return gulp.src(settings.app.app)
        .pipe($.sourcemaps.init())
        .pipe(tsProject())
        .pipe($.sourcemaps.write('.', {sourceRoot: '/src'}))
        .pipe(gulp.dest(settings.build.appPath));
});

gulp.task('ts-watcher', function () {
    //gulp.watch(settings.app.allTSs, ['browserify-inject-js']);
});

function serve(isDev) {
    var nodeOptions = {
        script: settings.server.serverApp,
        ext: 'js',
        delay: 2500,
        env: {
            'PORT': settings.server.port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: settings.server.serverFiles
    };
    return $.nodemon(nodeOptions)
        .on('start', function () {
            msg('...start servera ...');
        })
        .on('restart', function () {
            msg('...restart servera...');
        })
        .on('exit', function () {
        })
        .on('crash', function () {
            msg('!!!Wystąpiły bęłdy');
        });
}


//--functions
function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}

function runTests(done) {
    var Server = require('karma').Server;
    var karmaServer = new Server({
        configFile: __dirname + '/karma.conf.js',
    }, function (exitCode) {
        done();
    }).start();
}
