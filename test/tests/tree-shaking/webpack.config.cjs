const path = require('path')

const ENTRY_POINTS = {
  file: `${__dirname}/file.js`,
  nonDependent: `${__dirname}/nonDependent.js`,
  dependent: `${__dirname}/dependent.js`
}

let entryKey = process.env[3]
if (!entryKey) {
  const DEFAULT_ENTRY_KEY = 'file'
  console.warn(`No entryKey was passed, so will default to: ${DEFAULT_ENTRY_KEY}`)
  entryKey = DEFAULT_ENTRY_KEY
}
const entry = ENTRY_POINTS[entryKey]

console.log({
  entryKey,
  entry
})

if (!entry) {
  throw new Error(`No entry. Tried using entryKey: ${entryKey}`)
}

// https://webpack.js.org/guides/tree-shaking/

module.exports = {
  entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // mode: 'production',
  mode: 'development',
  optimization: {
    usedExports: true
  }
}
