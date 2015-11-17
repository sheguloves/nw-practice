var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var bases = {
    app: 'build/app/',
    dist: 'build/'
};

var paths = {
    styles: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'app/assets/css/app.css'
    ],
    fonts: [
        'bower_components/bootstrap/dist/fonts/*.*',
        'bower_components/font-awesome/fonts/*.*'
    ],
    libs: ['bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-animate/angular-animate.min.js'
    ],
    indexhtml: ['index.html'],
    copyfiles: ['service/*.js', 'service/datastore/*.*', 'app/views/*.*', 'package.json'],
    js: ['app/*.js', 'app/**/*.js']
};

// delete the build directory
gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean({force: true}));
});

gulp.task('copy-files', function() {
    return gulp.src(paths.copyfiles, {base: './'})
        .pipe(gulp.dest(bases.dist));
})

// concat vendor js files
gulp.task('concat-vendor', function() {
    return gulp.src(paths.libs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(bases.app + 'js'));
});

// concat and compress js files
gulp.task('compressjs', function() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.app + 'js'));
});

// concat and minify css files
gulp.task('concat-css', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCss())
        .pipe(gulp.dest(bases.app + 'css'));
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(bases.app + 'fonts'));
});

// replace css/libs/js with min files
gulp.task('html-replace', ['copy-files', 'copy-fonts', 'concat-css',
    'compressjs', 'concat-vendor'],  function() {
    gulp.src(paths.indexhtml)
        .pipe(htmlreplace({
            'css': ['app/css/bootstrap.min.css', 'app/css/font-awesome.min.css', 'app/css/app.css'],
            'libs': 'app/js/vendor.min.js',
            'js': 'app/js/app.min.js'
        }))
        .pipe(gulp.dest(bases.dist));
});

//build full app
gulp.task('default', ['clean', 'html-replace'],  function() {
});
