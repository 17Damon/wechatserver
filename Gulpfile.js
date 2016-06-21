var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function () {

    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: true,
            transform: ['reactify']
        }))
        //  压缩文件
        .pipe(uglify())
        .pipe(gulp.dest('./public/'));

});

gulp.task('default', ['scripts']);

