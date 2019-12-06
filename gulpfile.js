const {src, dest, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();

function html() {
    return src('./src/*.html').pipe(dest('./dest'))
    .pipe(browserSync.stream());
}


exports.html = html;