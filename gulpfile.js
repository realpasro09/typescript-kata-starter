var gulp = require('gulp');
require('gulp-stats')(gulp);
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var istanbul = require('gulp-istanbul');
var duration = require('gulp-duration')
var sourcemaps = require('gulp-sourcemaps');
var sequence = require('gulp-sequence');
var debug = require('gulp-debug');
var fs = require('fs');

var tsPath = 'src/**/*.ts';

gulp.task('default', sequence('compile', 'unit-tests'));

gulp.task('clean-build', function(){
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

gulp.task('clean-coverage', function(){
    return gulp.src('coverage/', {read: false})
        .pipe(clean());
});

gulp.task('compile', ['clean-build'],function(){
    var tsProject = ts.createProject('tsconfig.json');
    var compilePipeline =
        gulp.src(['src/index.ts', 'src/**/*.ts', 'typings/main/**/*', 'typings/main.d.ts', 'typings/custom/**/*.ts'])
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject)).js
            .pipe(sourcemaps.write({sourceRoot: '/src', includeContent: false}))
            .pipe(gulp.dest('build/src'));

    return compilePipeline;
});

gulp.task('pre-test', function () {
  return gulp.src(['build/**/*.js', '!build/src/features/**/*'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('unit-tests', ['clean-coverage', 'pre-test'], function(){
    return gulp.src(['build/src/**/*.spec.js'])
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reportOpts: {
                dir: './coverage'
            },
            reporters: ['text-summary', 'html']
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }));
});
