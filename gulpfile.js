var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  return browserify('./source/index.js')
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('eddystone.js'))
        .pipe(gulp.dest('./build/'));
});

