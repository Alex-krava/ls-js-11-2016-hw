var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');


var path = {
    'resource': './resource/',
    'public': './public/',
}

gulp.task('foundation', function () {
    return gulp.src(['node_modules/handlebars/dist/handlebars.min.js'])
        .pipe(concat('./resource/assets/js/foundation.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('webpack', function() {
    return gulp.src('./resource/assets/js/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./public/index.html')
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./resource/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    // connect.server({
    //     root: 'public',
    //     port: 3000,
    //     livereload: true
    // });
});

gulp.task('copyHtml', function () {
    gulp
        .src('./resource/index.html')
        .pipe(gulp.dest('./public'));
});
gulp.task('copyFolder', function () {
    gulp
        .src('./resource/server/**/*')
        .pipe(gulp.dest('./public/server'));
});

gulp.task('watch', function () {
    gulp.watch(['./public/index.html'], ['html']);
    gulp.watch(['./resource/**/*.js'], ['webpack']);
    gulp.watch(['./resource/index.html'], ['copyHtml']);
    gulp.watch(['./resource/server/**/*'], ['copyFolder']);
    gulp.watch('./resource/assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['webpack', 'copyFolder', 'copyHtml', 'sass', 'foundation', 'connect', 'watch']);
