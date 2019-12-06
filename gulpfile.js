const {src, dest, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');
const miniCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

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

function js() {
    return src(['./src/js/resources.js', './src/js/app.js', './src/js/engine.js'])
    .pipe(babel({
      presets: [
          ['@babel/preset-env', {modules: false}]
  ]
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('./dest/js/'))
    .pipe(browserSync.stream());
}

exports.html = html;
exports.css = css;
exports.image = image;
exports.js = js;