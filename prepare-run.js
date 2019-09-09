// @ts-check
const fs = require('fs')

const PUBLIC_SCRIPT_DIRECTORY = './public/scripts'

if (!fs.existsSync(PUBLIC_SCRIPT_DIRECTORY)) {
  fs.mkdirSync(PUBLIC_SCRIPT_DIRECTORY)
} else {
}

console.log('Copying bundle to public folder')
fs.copyFileSync(
  './dist/bundles/index.umd.js',
  `${PUBLIC_SCRIPT_DIRECTORY}/accumulator.js`
)
fs.copyFileSync(
  './dist/bundles/index.umd.js.map',
  `${PUBLIC_SCRIPT_DIRECTORY}/index.js.map`
)
console.log('Done copying!!')
