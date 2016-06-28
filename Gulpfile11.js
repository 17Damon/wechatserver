process.env.NODE_ENV = 'production';
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify');

// gulp.task('scripts', function () {
//
//     gulp.src(['app/main.js'])
//         .pipe(browserify({
//             debug: true,
//             transform: ['reactify']
//         }))
//         //  缩短文件 
//         // .pipe(uglify())
//         .pipe(gulp.dest('./public/'));
//
// });


gulp.task('scripts', function () {

    gulp.src(['public/temp/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/'));

});

gulp.task('default', ['scripts']);

