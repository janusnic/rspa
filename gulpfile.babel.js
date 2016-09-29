// Include required modules
import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import nodemon from 'gulp-nodemon';
import path from 'path';

import autoprefixer from  'gulp-autoprefixer';
import filter from  'gulp-filter';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';

//var browserSync  = require('browser-sync');
//var concat       = require('gulp-concat');
//var eslint       = require('gulp-eslint');

//var newer        = require('gulp-newer');
//var notify       = require('gulp-notify');

//var reload       = browserSync.reload;
var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

let plumberOptions = {
  errorHandler: onError,
};

// Compile Sass to CSS
gulp.task('sass', () => {
  let autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  let filterOptions = '**/*.css';

  // var reloadOptions = {
  //   stream: true,
  // };

  let sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('src/client/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(filter(filterOptions));
    //.pipe(reload(reloadOptions));
});

/**
 * Build (Webpack)
 */

gulp.task('clean:build', function() {
    del('./dist/js/*')
})

gulp.task('build', ['clean:build'], function() {
  return gulp.src('./src/client/app.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch:build', ['build','sass'], () => {

  gulp.watch('./src/client/**/*.js,*.jsx', ['build']);
  gulp.watch('src/client/sass/**/*.scss', ['sass']);
});

/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
  var babelPath = path.join(__dirname, 'node_modules/.bin/babel-node');
  nodemon({
    exec: babelPath + ' ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});


/**
 * Main tasks
 */

gulp.task('serve', ['serve:node']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);

// gulp.task('build', () => {
//     return browserify({entries: './src/client/app.js', extensions: [".js", ".jsx"], debug: true})
//         .transform('babelify', {
//             presets: ['es2015', 'react'],
//             plugins: ['transform-class-properties']
//         })
//         .bundle()
//         .on('error', function(err){
//             gutil.log(gutil.colors.red.bold('[browserify error]'));
//             gutil.log(err.message);
//             this.emit('end');
//         })
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('dist/js'));
// });
//
// gulp.task('watch', ['build','sass'], () => {
//     gulp.watch('./src/client/**/*.js,*.jsx', ['build']);
//     gulp.watch('src/client/sass/**/*.scss', ['sass']);
// });

//Copy static files from html folder to build folder
// gulp.task('copyStaticFiles', () => {
//     return gulp.src("./src/client/*.html")
//     .pipe(gulp.dest("./dist"));
// });
//
// gulp.task('default', ["copyStaticFiles",'watch']);
