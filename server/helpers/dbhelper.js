const fs = require('fs')

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

module.exports = { userdb }