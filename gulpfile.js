var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('default', ['watch', 'scripts']);

gulp.task('scripts', function() {
   sequence('compile', 'compress');
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('compile', function () {
  return browserify('./src/index.js')
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('eddystone.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('compress', function() {
         return gulp.src('./build/eddystone.js')
        .pipe(uglify())
        .pipe(rename('eddystone-min.js'))
        .pipe(gulp.dest('./build/'));
});


