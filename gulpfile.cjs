// const eslint = require('gulp-eslint')
// https://github.com/origin-1/gulp-eslint-new/issues/8
/**
 * @type {import('gulp-eslint-new')['default']}
 */
const eslint = require('gulp-eslint-new')
const gulp = require('gulp')
const reporter = require('eslint-html-reporter')
const path = require('path')
const fs = require('fs')

// If programmatic handling of mocha of desired, check below:
// const Mocha = require('mocha');
// const mocha = new Mocha({  })
// mocha.addFile('...')
// mocha.run().on(...)
// https://stackoverflow.com/a/29802434/1764521

gulp.task('eslint', function () {
  return gulp.src(['./src/*.js'])
    .pipe(eslint({
      overrideConfigFile: './.eslintrc'
    }))
    .pipe(eslint.format(reporter, function (results) {
      fs.writeFileSync(path.join(__dirname, 'report-results.html'), results)
    }))
})
