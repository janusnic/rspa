# rspa stage 01

# Sass and Autoprefixer

## install devdependencies

    npm install --save-dev gulp-autoprefixer gulp-filter gulp-plumber gulp-sass gulp-sourcemaps gulp-notify


## Compile Sass to CSS

## gulpfile.babel.js

    import autoprefixer from  'gulp-autoprefixer';
    import filter from  'gulp-filter';
    import plumber from 'gulp-plumber';
    import sass from 'gulp-sass';
    import sourcemaps from 'gulp-sourcemaps';
    import notify from 'gulp-notify';

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

    });

    gulp.task('watch', ['build','sass'], () => {
        gulp.watch('./src/client/**/*.js,*.jsx', ['build']);
        gulp.watch('src/client/sass/**/*.scss', ['sass']);
    });    

# components/home.js

        import React from 'react';

        const Home = React.createClass({
          render: function() {
            return (
              <div className="home-page">
                <h1>SPA React Home Page</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            );
          }
        });

        export default Home;

# app.js

        import React from 'react';
        import ReactDOM from 'react-dom';
        import Home from './components/home';

        ReactDOM.render(
            <Home />,
            document.getElementById('root')
        );


# index.html

        <!DOCTYPE html>
        <html>
        <head lang="en">
            <meta charset="UTF-8">
            <title>ReactJS and ES6</title>
        </head>
        <body>
        <div id="root"></div>
        <script src="dist/bundle.js"></script>
        </body>
        </html>

## install devdependencies

        npm install --save-dev webpack webpack-stream gulp-nodemon

# webpack.config.js

        var path = require('path');

        module.exports = {
            entry: "./src/client/app.js",
            output: {
                filename: "dist/js/bundle.js",
                sourceMapFilename: "dist/js/bundle.map"
            },
            devtool: '#source-map',
            module: {
                loaders: [
                    {
                        loader: 'babel',
                        exclude: /node_modules/
                    }
                ]
            }
        }

# package.json

        "devDependencies": {
          "babel-cli": "^6.16.0",
          "babel-core": "^6.14.0",
          "babel-loader": "^6.2.5",
          "babel-plugin-transform-class-properties": "^6.11.5",
          "babel-preset-es2015": "^6.14.0",
          "babel-preset-react": "^6.11.1",
          "babelify": "^7.3.0",
          "browserify": "^13.1.0",
          "del": "^2.2.2",
          "gulp": "^3.9.1",
          "gulp-autoprefixer": "^3.1.1",
          "gulp-filter": "^4.0.0",
          "gulp-nodemon": "^2.2.1",
          "gulp-notify": "^2.2.0",
          "gulp-plumber": "^1.1.0",
          "gulp-sass": "^2.3.2",
          "gulp-sourcemaps": "^1.6.0",
          "gulp-util": "^3.0.7",
          "vinyl-source-stream": "^1.1.0",
          "webpack": "^1.13.2",
          "webpack-stream": "^3.2.0"
        },
        "dependencies": {
          "express": "^4.14.0",
          "react": "^15.3.2",
          "react-dom": "^15.3.2",
          "react-router": "^2.8.1"
        }

## gulpfile.babel.js

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

# router.js

        import React from 'react';
        import { Router, Route, browserHistory, IndexRoute } from 'react-router';

        // Layouts
        import MainLayout from './components/main-layout';

        // Pages
        import Home from './components/home';

        export default (
          <Router history={browserHistory}>
            <Route component={MainLayout}>
              <Route path="/" component={Home} />
            </Route>
          </Router>
        );

# app.js

        import React from 'react';
        import ReactDOM from 'react-dom';
        // Notice that we've organized all of our routes into a separate file.
        import Router from './router';

        ReactDOM.render(Router, document.getElementById('root'));

# components/main-layout.js

        import React from 'react';
        import { Link } from 'react-router';

        const MainLayout = React.createClass({
          render: function() {
            return (
              <div className="app">
                <header className="primary-header"></header>
                <aside className="primary-aside">
                  <ul>
                    <li><Link to="/" activeClassName="active">Home</Link></li>

                  </ul>
                </aside>
                <main>
                  {this.props.children}
                </main>
              </div>
            );
          }
        });

        export default MainLayout;

# server.js

        /**
         * This is just a dummy server to facilidate our React SPA examples.
         * For a more professional setup of Express, see...
         * http://expressjs.com/en/starter/generator.html
         */

        import express from 'express';
        import path from 'path';
        const app = express();


        /**
         * Anything in public can be accessed statically without
         * this express router getting involved
         */

        app.use(express.static(path.join(__dirname, 'dist'), {
          dotfiles: 'ignore',
          index: false
        }));


        /**
         * Always serve the same HTML file for all requests
         */

        app.get('*', function(req, res, next) {
          console.log('Request: [GET]', req.originalUrl)
          res.sendFile(path.resolve(__dirname, 'dist/index.html'));
        });


        /**
         * Error Handling
         */

        app.use(function(req, res, next) {
          console.log('404')
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
        });

        app.use(function(err, req, res, next) {
          res.sendStatus(err.status || 500);
        });


        /**
         * Start Server
         */

        const port = 3000;
        app.listen(port);

        console.log('Visit: localhost:' + port);
