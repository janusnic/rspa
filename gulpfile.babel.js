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
