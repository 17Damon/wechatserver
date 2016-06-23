//引入依赖的各种包：
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    dependify = require('dependify'),
    babelify = require('babelify'),
    argv = require('yargs').argv;

//定义一些全局函数及变量
function getJsLibName() {
    var libName = 'main.js';
    if (argv.min) {  //按命令参数"--min"判断是否为压缩版
        libName = 'main.min.js';
    }

    return libName;
}


//定义各种任务

// gulp.task('build-all-css', ...);
//
// gulp.task('build', ['build-all-js', 'build-all-css', ...]);
// gulp.task('build-all-js', ...);

gulp.task('build-js', function () {

    gulp.src(['app/main.js'])
        .pipe(
            browserify({
                debug: true
            }).plugin(dependify, {  //使打包后的js文件符合UMD规范并指定外部依赖包
                name: 'Main',
                deps: {
                    'nornj': 'nj',
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                }
            }).transform(
                (babelify, {  //此处babel的各配置项格式与.babelrc文件相同
                    presets: [
                        'es2015',  //转换es6代码
                        'stage-2',  //指定转换es7代码的语法提案阶段
                        'react'  //转换React的jsx
                    ],
                    plugins: [
                        'transform-object-assign',  //转换es6 Object.assign插件
                        'external-helpers',  //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
                        ['transform-es2015-classes', {"loose": false}],  //转换es6 class插件
                        ['transform-es2015-modules-commonjs', {"loose": false}],  //转换es6 module插件
                    ]
                })
            )  //使用babel转换es6代码
        )
        .bundle()  //合并打包
        // .pipe(source(getJsLibName()))  //将常规流转换为包含Stream的vinyl对象，并且重命名
        // .pipe(buffer())  //将vinyl对象内容中的Stream转换为Buffer
        //  缩短文件
        // .pipe(uglify())
        .pipe(gulp.dest('./public/')); //输出打包后的文件
});
// gulp.task('build-js', function () {
//     return browserify({
//         entries: './app/main.js'  //指定打包入口文件
//     })
//         .plugin(dependify, {  //使打包后的js文件符合UMD规范并指定外部依赖包
//             name: 'Main',
//             deps: {
//                 'nornj': 'nj',
//                 'react': 'React',
//                 'react-dom': 'ReactDOM'
//             }
//         })
//         .transform(
//             (babelify, {  //此处babel的各配置项格式与.babelrc文件相同
//                     presets: [
//                         'es2015',  //转换es6代码
//                         'stage-2',  //指定转换es7代码的语法提案阶段
//                         'react'  //转换React的jsx
//                     ],
//                     plugins: [
//                         'transform-object-assign',  //转换es6 Object.assign插件
//                         'external-helpers',  //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
//                         ['transform-es2015-classes', {"loose": false}],  //转换es6 class插件
//                         ['transform-es2015-modules-commonjs', {"loose": false}],  //转换es6 module插件
//                         ["antd", {style: "css"}]
//                     ]
//                 }
//             ))  //使用babel转换es6代码
//         .bundle()  //合并打包
//         .pipe(source(getJsLibName()))  //将常规流转换为包含Stream的vinyl对象，并且重命名
//         .pipe(buffer())  //将vinyl对象内容中的Stream转换为Buffer
//         .pipe(gulp.dest('./public/')); //输出打包后的文件
// });

//
// var concat = require('gulp-concat'),
//     sequence = require('gulp-sequence'),
//     gulpif = require('gulp-if'),
//     uglify = require('gulp-uglify');
//
// //定义连接js任务
// gulp.task('concat-js', function () {
//     var jsLibName = getJsLibName();
//     return gulp.src(['./app/babelHelpers.js', './public' + jsLibName])
//         .pipe(concat(jsLibName))
//         .pipe(gulpif(argv.min, uglify()))
//         .pipe(gulp.dest('./public'));
// });
//
// //将两个任务串联起来
// gulp.task('build-all-js', sequence('build-js', 'concat-js'));


//定义默认任务
gulp.task('default', ['build-js']);