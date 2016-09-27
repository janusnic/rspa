# rspa

        nvm use 6.6
        Now using node v6.6.0 (npm v3.10.3)

        ~ $ cd github/
        ~/github $ git clone https://github.com/janusnic/rspa
        ~/github $ cd rspa/
        ~/github/rspa $ git init
        ~/github/rspa $ npm init -y

# package.json:

        {
         "name": "rspa",
         "version": "1.0.0",
         "description": "",
         "main": "index.js",
         "scripts": {
           "test": "echo \"Error: no test specified\" && exit 1"
         },
         "repository": {
           "type": "git",
           "url": "git+https://github.com/janusnic/rspa.git"
         },
         "keywords": [],
         "author": "",
         "license": "ISC",
         "bugs": {
           "url": "https://github.com/janusnic/rspa/issues"
         },
         "homepage": "https://github.com/janusnic/rspa#readme"
        }
# install gulp and babel

         npm install -g gulp-cli
         npm install --save-dev gulp babel-core babel-preset-es2015

         .babelrc:
        {
          "presets": ["es2015"]
        }

# install devdependencies

    npm install --save-dev babel-plugin-transform-class-properties babel-preset-react babelify browserify gulp-util vinyl-source-stream

    babel-plugin-transform-class-properties
    babel-preset-react
    babelify
    browserify
    gulp-util
    history


# install dependencies

     npm install --save react react-dom react-router

     react
     react-dom
     react-router

# gulpfile.js
        //Include required modules
        var gulp = require('gulp');
        var browserify = require('browserify');
        var babelify = require('babelify');
        var source = require('vinyl-source-stream');

        gulp.task('build', function () {
            return browserify({entries: './src/client/app.jsx', extensions: ['.jsx'], debug: true})
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('dist'));
        });

        gulp.task('watch', ['build'], function () {
            gulp.watch('./src/client/**/*.jsx', ['build']);
        });

        gulp.task('default', ['watch']);

# src/client/app.jsx

        import React from 'react';
        import ReactDOM from 'react-dom';
        import HelloWorld from './hello';

        ReactDOM.render(
            <HelloWorld phrase="ES6"/>,
            document.body
        );

# src/client/hello.jsx

        import React from 'react';

        class HelloWorld extends React.Component {
            render() {
                return <h1>Hello from {this.props.phrase}!</h1>;
            }
        }

        export default HelloWorld;


# index.html

        <!DOCTYPE html>
        <html>
        <head lang="en">
            <meta charset="UTF-8">
            <title>ReactJS and ES6</title>
        </head>
        <body>
        <script src="dist/bundle.js"></script>
        </body>
        </html>


gulp

# Copy static files from html folder to build folder

        //Include required modules
        var gulp = require('gulp');
        var browserify = require('browserify');
        var babelify = require('babelify');
        var source = require('vinyl-source-stream');

        //Convert ES6 ode in all js files in src/js folder and copy to
        //build folder as bundle.js
        gulp.task('build', function () {
            return browserify({entries: './src/client/app.js', extensions: [".js", ".jsx"], debug: true})
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('dist/js'));
        });

        gulp.task('watch', ['build'], function () {
            gulp.watch('./src/client/**/*.js',*.jsx', ['build']);
        });

        //Copy static files from html folder to build folder
        gulp.task("copyStaticFiles", function(){
            return gulp.src("./src/client/*.html")
            .pipe(gulp.dest("./dist"));
        });

        //Default task. This will be run when no task is passed in arguments to gulp
        gulp.task('default', ["copyStaticFiles",'watch']);

# gulpfile.js --> gulpfile.babel.js

        //Include required modules
        import gulp from 'gulp';
        import gutil from 'gulp-util';
        import browserify from 'browserify';
        import babelify from 'babelify';
        import source from 'vinyl-source-stream';

        gulp.task('build', () => {
            return browserify({entries: './src/client/app.js', extensions: [".js", ".jsx"], debug: true})
                .transform('babelify', {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                })
                .bundle()
                .on('error', function(err){
                    gutil.log(gutil.colors.red.bold('[browserify error]'));
                    gutil.log(err.message);
                    this.emit('end');
                })
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('dist/js'));
        });

        gulp.task('watch', ['build'], () => {
            gulp.watch('./src/client/**/*.js,*.jsx', ['build']);
        });

        //Copy static files from html folder to build folder
        gulp.task('copyStaticFiles', () => {
            return gulp.src("./src/client/*.html")
            .pipe(gulp.dest("./dist"));
        });

        gulp.task('default', ["copyStaticFiles",'watch']);


warning.js:36Warning: render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.printWarning @ warning.js:36

# index.html

        <!DOCTYPE html>
        <html>
        <head lang="en">
            <meta charset="UTF-8">
            <title>ReactJS and ES6</title>
        </head>
        <body>
            <h1>Hello World</h1>
            <div id="hello"></div>
        <script src="js/bundle.js"></script>
        </body>
        </html>

# app.js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import HelloWorld from './hello';

        ReactDOM.render(
            <HelloWorld phrase="ES6"/>,
            document.getElementById('hello')
        );
