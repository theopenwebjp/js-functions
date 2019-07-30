const eslint = require('gulp-eslint')
const gulp = require('gulp')
const reporter = require('eslint-html-reporter')
const path = require('path')
const fs = require('fs')

const NodeFunctions = require('node-functions')

gulp.task('eslint', function () {
  gulp.src(['./src/*.js'])
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format(reporter, function (results) {
      fs.writeFileSync(path.join(__dirname, 'report-results.html'), results)
        })
    )
})

gulp.task('browserify-tests', function () {
  NodeFunctions.browserifyFolder(path.resolve('./test/tests/browser/tests'), path.resolve('./test/tests/browser/dist/bundle.test.js'))
})
