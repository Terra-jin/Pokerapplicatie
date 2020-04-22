/// <binding BeforeBuild='TypescriptCompile' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var minify = require('gulp-minify');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('TypescriptCompile', function () {
    return gulp.src('ts/**/*.ts*')
        .pipe(ts({
            noImplicitAny: false,
            removeComments: true,
            jsx: 'react',
            out: 'Kerstens-Test.js',
            target: 'es5',
            module: "system",
            moduleResolution: "node",
            declaration: true,
            skipLibCheck: true
        }))
        .pipe(minify({ ext: { src: '.js', min: '.min.js' }, }))
        .pipe(gulp.dest('output'));
});
