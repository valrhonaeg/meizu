let gulp = require('gulp');
let cssMin = require('gulp-cssmin')
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')
let htmlMin = require('gulp-htmlmin')


function css(){
    return gulp.src('./src/css/**')
                .pipe(cssMin())
                .pipe(gulp.dest('./dist/css'))
}
function js(){
    return gulp.src('./src/js/**')
                .pipe(babel({
                    presets:["env"]
                }))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'))
}

function html(){
    return gulp.src('./src/html/**')
                .pipe(htmlMin({
                    collapseWhitespace:true,
                    removeEmptyAttributes:true,
                    minifyCSS:true,
                    minifyJS:true
                }))
                .pipe(gulp.dest('./dist/html'))
}



exports.css = css;
exports.js = js;
exports.html = html;