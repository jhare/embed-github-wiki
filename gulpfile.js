'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var tap = require('gulp-tap');
var debug = require('gulp-debug');
var manifest = require('gulp-concat-filenames');

var options = {
  'buildDir': './dist/',
  'javascript': {
    'buildFile': 'ng-embed-github-wiki.js',
    'sources': [
      './src/public/ng-embed-github-wiki.js',
      './src/public/core/**/*.js',
      './src/public/common/**/*.js',
      './src/public/features/**/*.js'
    ]
  },
  'browserify': {
    'debug': true
  },
  'partials': {
    'sources': [
      './src/core/common/**/*.html',
      './src/public/common/**/*.html',
      './src/public/features/**/*.html'
    ]
  },
  'manifest': {
    'root': './',
    'prepend': 'require("./',
    'append': '");'
  },
  'styles': {
    'buildFile': 'styles.css',
    'sources': [
      './src/public/styles/**/*.styl'
    ]
  }
};

function buildJavascript() {
  function doBrowserification(file) {
    return browserify(file, options.browserify)
      .bundle()
      .pipe(source(options.javascript.buildFile))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(options.buildDir));
  }

  return gulp
    .src(options.javascript.sources)
    .pipe(uglify())
    .pipe(manifest(options.javascript.buildFile, options.manifest))
    .pipe(tap(doBrowserification));
}

function buildStyles() {
  return gulp
    .src(options.styles.sources)
    .pipe(stylus())
    .pipe(concat(options.styles.buildFile))
    .pipe(gulp.dest(options.buildDir));
}

function buildPartials() {
  return gulp
    .src(options.partials.sources)
    .pipe(gulp.dest(options.buildDir + '/partials'));
}

gulp.task('build-javascript', buildJavascript);
gulp.task('build-styles', buildStyles);
gulp.task('build-partials', buildPartials);

gulp.task('build', ['build-javascript', 'build-styles', 'build-partials']);
