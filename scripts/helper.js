const path = require('path')

module.exports = {
  join: paths => path.join(__dirname, `../${paths}`)
}
