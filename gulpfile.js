'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tap = require('gulp-tap');
var manifest = require('gulp-concat-filenames');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

var options = {
  'buildDir': './dist/',
  'javascript': {
    'core': {
      'buildFile': 'core.js',
      'sources': [
        './src/public/core/**/*.js'
      ]
    },
    'common': {
      'buildFile': 'common.js',
      'sources': [
        './src/public/common/**/*.js'
      ]
    },
    'features': {
      'buildFile': 'features.js',
      'sources': [
        './src/public/features/**/*.js'
      ]
    },
    'tests': [
      './test/unit/public/**/*.js'
    ]
  },
  'server': {
    'app': './src/server/app.js',
    'sources': [
      './src/server/**/*.js'
    ],
    'tests': [
      './test/unit/server/**/*.js'
    ]
  },
  'partials': {
    'sources': [
      './src/public/common/**/*.html',
      './src/public/features/**/*.html'
    ]
  },
  'pages': {
    'sources': [
      './src/public/pages/**/*.html',
      './src/server/**/*.html' // for indexes and stuff
    ]
  },
  'images': [
    './src/public/common/images/**/*'
  ],
  'browserify': {
    'debug': true
  },
  'manifest': {
    'root': './',
    'prepend': 'require("./',
    'append': '");'
  },
  'styles': {
    'buildFile': 'styles.css',
    'sources': [
      './src/public/core/**/*.styl',
      './src/public/common/**/*.styl',
      './src/public/features/**/*.styl'
    ]
  },
  'testReporter': 'nyan'
};

function buildJavascript(target) {
  function doBrowserification(file) {
    return browserify(file, options.browserify)
      .bundle()
      .pipe(source(target.buildFile))
      //.pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest(options.buildDir))
      .pipe(livereload());
  }

  return gulp
    .src(target.sources)
    //.pipe(uglify())
    .pipe(manifest(target.buildFile, options.manifest))
    .pipe(tap(doBrowserification));
}

function buildCore() {
  return buildJavascript(options.javascript.core);
}

function buildCommon() {
  return buildJavascript(options.javascript.common);
}

function buildFeatures() {
  return buildJavascript(options.javascript.features);
}

function buildStyles() {
  gulp.src(options.styles.sources)
    .pipe(stylus())
    .pipe(concat(options.styles.buildFile))
    .pipe(gulp.dest(options.buildDir))
    .pipe(livereload())
  ;
}

function buildPartials() {
  gulp.src(options.partials.sources)
    .pipe(gulp.dest(options.buildDir + '/partials'))
    .pipe(livereload())
  ;
}

function buildPages() {
  gulp.src(options.pages.sources)
    .pipe(gulp.dest(options.buildDir))
    .pipe(livereload())
  ;
}

function buildImages() {
  gulp.src(options.images)
    .pipe(gulp.dest(options.buildDir + '/images'))
    .pipe(livereload())
  ;
}

function unitTestServer() {
  return gulp.src(options.server.tests)
    .pipe(mocha({
      'reporter': options.testReporter 
    }));
}

function unitTestClient() {
  return gulp.src(options.javascript.tests)
    .pipe(mocha({
      'reporter': options.testReporter 
    }));
}

function watchUnitTests() {
  gulp.watch([options.server.sources, options.server.tests], ['test-server']);

  gulp.watch([
    options.javascript.common.sources,
    options.javascript.features.sources,
    options.javascript.tests],
    ['test-server']
  );
}

function watchClientSide(target, taskList) {
  gulp.watch(target.sources, taskList);
}

function watchCore() {
  watchClientSide(options.javascript.core, ['build-core']);
}

function watchCommon() {
  watchClientSide(options.javascript.common, ['build-common']);
}

function watchFeatures() {
  watchClientSide(options.javascript.features, ['build-features']);
}

function watchStyles() {
  watchClientSide(options.styles, ['build-styles']);
}

function watchPartials() {
  watchClientSide(options.partials, ['build-partials']);
}

function watchPages() {
  watchClientSide(options.pages, ['build-pages']);
}

function watchImages() {
  gulp.watch(options.images, ['build-images']);
}

function startLiveReload() {
  livereload.listen();
}

function serveProject() {
  nodemon({
    'script': options.server.app,
    'watch': options.server.sources
  });
}

// Testing
gulp.task('test-server', unitTestServer);
gulp.task('test-client', unitTestClient);

// Building
gulp.task('build-core', buildCore);
gulp.task('build-common', buildCommon);
gulp.task('build-features', buildFeatures);
gulp.task('build-javascript', [
  'build-core',
  'build-common',
  'build-features'
]);

gulp.task('build-styles', buildStyles);
gulp.task('build-partials', buildPartials);
gulp.task('build-pages', buildPages);
gulp.task('build-images', buildImages);

gulp.task('build', [
  'build-javascript',
  'build-styles',
  'build-partials',
  'build-pages'
]);

// Watches
gulp.task('start-livereload', startLiveReload);

gulp.task('watch-server-test-unit', watchUnitTests);
gulp.task('watch-core', watchCore);
gulp.task('watch-common', watchCommon);
gulp.task('watch-features', watchFeatures);
gulp.task('watch-styles', watchStyles);
gulp.task('watch-partials', watchPartials);
gulp.task('watch-pages', watchPages);
gulp.task('watch-images', watchImages);

gulp.task('watch-client', [
  'start-livereload',
  'watch-core',
  'watch-common',
  'watch-features',
  'watch-styles',
  'watch-partials',
  'watch-pages',
  'watch-images'
]);

// Other
gulp.task('serve', serveProject);
gulp.task('test', ['test-server', 'test-client']);
gulp.task('watch', ['serve', 'watch-client']);
