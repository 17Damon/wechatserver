/**
 * Created by zhubg on 2016/6/23.
 */
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
process.env.NODE_ENV = 'production';
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    dependify = require('dependify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    // 1. 找到文件
    gulp.src('app/main.js')
        .pipe(
            browserify()
            .transform("babelify", {presets: ["es2015", "react"]})
        )
        //压缩文件
        // .pipe(uglify())
        .pipe(gulp.dest('./public/'))
});

gulp.task('default', ['scripts']);

//
// browserify()
//     .transform("babelify", {presets: ["es2015", "react"]})
//     .bundle()