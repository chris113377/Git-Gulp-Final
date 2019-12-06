const {src, dest, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');
const miniCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

function html() {
    return src('./src/*.html').pipe(dest('./dest'))
    .pipe(browserSync.stream());
}

function css() {
    return src('./src/css/**/*.css')
      .pipe(prefix({
          cascade: false
      }))
      .pipe(miniCSS())
      .pipe(dest('./dest/css/'))
      .pipe(browserSync.stream());
}

function image() {
    return src('./src/images/*')
      .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.jpegtran({progressive: true})
      ]))
      .pipe(dest('./dest/images'))
      .pipe(browserSync.stream());
}

exports.html = html;
exports.css = css;
exports.image = image;