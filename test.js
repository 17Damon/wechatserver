process.env.NODE_ENV = 'production';
var fs = require('graceful-fs'),
    gulp = require('gulp'),
    browserify = require("browserify");



    browserify("./app/main.js")
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(fs.createWriteStream("./public/temp/main.js"));

 