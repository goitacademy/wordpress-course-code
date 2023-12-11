"use strict";

const
    jsWatch = [
        './assets/js/app.js'
    ],
    jsFiles = [
        './assets/js/app.js',
        './assets/js/*.js',
        '!./assets/js/*.min.js',
    ],
    cssWatch = [
        './assets/scss/*.scss',
        './assets/scss/layout/*.scss',
        './assets/scss/admin_menu/*.scss',
    ],
    cssFiles = [
        './assets/scss/app.scss',
    ];

// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const gulp = require('gulp');
const {src, dest, watch, series, parallel} = gulp;

// Importing all the Gulp-related packages we want to use
const
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    babel = require('gulp-babel'),
    minifyjs = require('gulp-uglify-es').default,
    autoPrefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    merge = require('merge2');

// Sass task: compiles the style.scss file into style.css
function scssTask() {

    const cssBackFiles = src(cssFiles, {base: './'})
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./assets/scss/'));

    return merge(cssBackFiles);

}

// JS Task: minify scripts
function jsTask() {
    const jsBackFiles = src(jsFiles, {base: './'})
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: 'commonjs'
                }]
            ]
        }))
        .pipe(minifyjs())
        .pipe(concat('app.min.js'))
        .pipe(dest('./assets/js/'));

    return merge(jsBackFiles);

}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    watch([...cssWatch, ...jsWatch], series(parallel(scssTask, jsTask)));
}

// Export the default Gulp task, so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);
