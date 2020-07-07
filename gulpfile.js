var {src, dest, watch} = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),

    paths = {
        styles: {
            src: "style/**/*.scss",
            dest: "dist/css"
        },
        html: {
            src: "*.html",
            dest: "dist"
        }
    };

function html() {
    require('./server');
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
        .pipe(livereload())

}

function css() {
    return src(paths.styles.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefix({
            cascade: false
        }))
        .pipe(concat('main.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(livereload())
}


function watchScss() {
    livereload.listen();
    css();
    html();
    watch(paths.styles.src, css);
    watch(paths.html.src, html)
}

exports.html = html;
exports.css = css;
exports.watchScss = watchScss;