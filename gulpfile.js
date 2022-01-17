const gulp = require('gulp')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const htmlNano = require('gulp-htmlnano')
const cssNano = require('cssnano')
const htmlBeautify = require('gulp-html-beautify')
const gulpInline = require('gulp-inline')

gulp.task('default', () => {
  return gulp
    .src('./resources/*.html')
    .pipe(
      gulpInline({
        css: () => postcss([autoprefixer(), cssNano()]),
      })
    )
    .pipe(
      htmlNano({
        collapseWhitespace: true,
        removeComments: 'all',
        mergeStyles: true,
      })
    )
    .pipe(
      htmlBeautify({
        indentSize: 2,
      })
    )
    .pipe(gulp.dest('./dist'))
})
