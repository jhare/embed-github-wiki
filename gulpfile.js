'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var tap = require('gulp-tap');
var debug = require('gulp-debug');
var manifest = require('gulp-concat-filenames');
var htmlmin = require('gulp-htmlmin');
var html2js = require('gulp-ng-html2js');
var buffer = require('gulp-buffer');

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
  var htmlMinOpts = {
    'collapseWhitespace': true
  };

  var html2JsOpts = {
    'moduleName': 'embedGithubWikiPartials',
    'stripPrefix': 'src/public/features/'
  };

  return gulp
    .src(options.partials.sources)
    .pipe(htmlmin(htmlMinOpts))
    .pipe(html2js(html2JsOpts))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(options.buildDir));
}

gulp.task('build-javascript', buildJavascript);
gulp.task('build-styles', buildStyles);
gulp.task('build-partials', buildPartials);

gulp.task('build', ['build-javascript', 'build-styles', 'build-partials']);
