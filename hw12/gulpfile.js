var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat')
    connect = require('gulp-connect');


gulp.task('foundation', function() {
    return gulp.src(['node_modules/handlebars/dist/handlebars.min.js'])
        .pipe(concat('foundation.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('webpack', function() {
    return gulp.src('scripts/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        port: 3000,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['index.html'], ['html']);
    gulp.watch(['./scripts/**/*'], ['webpack']);
    gulp.watch(['./scripts/**/*.js'], ['foundation']);
});

gulp.task('default', ['webpack', 'foundation', 'connect', 'watch']);