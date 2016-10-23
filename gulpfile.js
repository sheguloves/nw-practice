var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var NwBuilder = require('nw-builder');

var bases = {
    app: 'build/app/',
    dist: 'build/',
    build: 'target/',
    clean: ['build/', 'target/']
};

var paths = {
    nodemodules: ['node_modules/bcrypt-nodejs/**',
        'node_modules/diskdb/**'],
    styles: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'app/assets/css/font-awesome.min.css',
        'app/lib/angular-datepicker.css',
        'app/assets/css/app.css'
    ],
    fonts: [
        'app/assets/font/*.*'
    ],
    libs: ['node_modules/moment/moment.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'app/lib/angular-datepicker.js'
    ],
    indexhtml: ['index.html'],
    copyfiles: ['service/*.js', 'service/datastore/*.*', 'app/views/*.*', 'package.json'],
    js: ['app/*.js', 'app/**/*.js']
};

// delete the build directory
gulp.task('clean', function() {
    return gulp.src(bases.clean, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-files', ['clean'], function() {
    return gulp.src(paths.copyfiles, {base: './'})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-node-modules', ['clean'], function() {
    return gulp.src(paths.nodemodules, {base: './'})
        .pipe(gulp.dest(bases.dist));
});

// concat vendor js files
gulp.task('concat-vendor', ['clean'], function() {
    return gulp.src(paths.libs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(bases.app + 'js'));
});

// concat and compress js files
gulp.task('compressjs', ['clean'], function() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.app + 'js'));
});

// concat and minify css files
gulp.task('concat-css', ['clean'], function() {
    return gulp.src(paths.styles)
        .pipe(minifyCss())
        .pipe(gulp.dest(bases.app + 'css'));
});

gulp.task('copy-fonts', ['clean'], function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(bases.app + 'font'));
});

// replace css/libs/js with min files
gulp.task('html-replace', ['clean', 'copy-files', 'copy-fonts', 'concat-css',
    'compressjs', 'concat-vendor'],  function() {
    return gulp.src(paths.indexhtml)
        .pipe(htmlreplace({
            'css': ['app/css/bootstrap.min.css', 'app/css/angular-datepicker.css',
                'app/css/font-awesome.min.css', 'app/css/app.css'],
            'libs': 'app/js/vendor.min.js',
            'js': 'app/js/app.min.js'
        }))
        .pipe(gulp.dest(bases.dist));
});


// build app
gulp.task('build-app', ['clean', 'html-replace', 'copy-node-modules'], function() {
    // before run this task, need to set proxy if your network is behind firewall,
    // and nw don't support proxy currently, but you can set the environment varibles
    // like: HTTP_PROXY=http://proxy.com:port
    var nw = new NwBuilder({
        version: '0.12.3',
        files: './build/**',
        platforms: ['win32', 'win64'],
        buildDir: "./target"
    });

    return nw.build().then(function() {
        console.log("All Done!");
    }).catch(function(err) {
        console.error(err);
    });
});

//build full app
gulp.task('default', ['clean', 'build-app'],  function() {
});
