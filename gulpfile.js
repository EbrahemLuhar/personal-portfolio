var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './dist',
        notify: false,
        open: false
    })
})

gulp.task('sass:minify', function () {
    return gulp.src('./dist/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
  });

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('./src/scss/**/*', ['sass'])
})

gulp.task('production', ['sass:minify'])