'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const cssMinify = require('gulp-csso')
const del = require('del')
const injectPartials = require('gulp-inject-partials')
const newer = require('gulp-newer')
const svgSprite = require('gulp-svg-sprite')
const prettier = require('gulp-prettier');

const webpack = require('webpack')
const webpackconfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream')

gulp.task('sprite', function() {
  return gulp
    .src('src/img/icons/*.svg')
    .pipe(
      svgSprite({
        mode: {
          inline: true, 
          symbol: {
            sprite: "sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest('src/img'))
})

gulp.task('html', function() {
  return gulp
    .src('src/*.html')
    .pipe(plumber())
    .pipe(injectPartials({ removeTags: true }))
    .pipe(prettier())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('styles', function() {
  return gulp
    .src('src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'))
    .pipe(cssMinify())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
})

gulp.task('scripts', function() {
  return gulp
    .src('./src/js/**/*')
    .pipe(plumber())
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream())
})

gulp.task('scripts-production', function() {
  return gulp
    .src('./src/js/**/*')
    .pipe(plumber())
    .pipe(webpackstream({ ...webpackconfig, mode: 'production' }, webpack))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream())
})


gulp.task('clean', function() {
  return del('./build')
})

gulp.task('serve', function() {
  browserSync.init({
    server: 'build/',
    port: 7000,
    ghostMode: false,
    host: '192.168.1.171'
  })
  gulp.watch('./src/**/*.html', gulp.series('html'))
  gulp.watch('./src/img/icons/*svg', gulp.series('sprite', 'html'))
  gulp.watch('./src/scss/**/*.scss', gulp.series('styles'))
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
  gulp.watch('./src/img/**/*', gulp.series('images'))
  gulp.watch('./src/misc/**/*', gulp.series('miscellaneous'))
})

gulp.task('images', function() {
  return gulp
    .src('./src/img/**/*')
    .pipe(newer('./build/img'))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
})



gulp.task('miscellaneous', function() {
  return gulp
    .src('./src/misc/**/*')
    .pipe(newer('./build/misc'))
    .pipe(gulp.dest('./build/misc'))
    .pipe(browserSync.stream())
})

gulp.task(
  'build',
  gulp.series(
    'clean',
    'images',
    'sprite',
    'html',
    gulp.parallel('miscellaneous', 'styles', 'scripts')
  )
)

gulp.task(
  'build-production',
  gulp.series(
    'clean',
    'images',
    'sprite',
    'html',
    gulp.parallel('miscellaneous', 'styles', 'scripts-production')
  )
)

gulp.task('default', gulp.series('build', 'serve'))
