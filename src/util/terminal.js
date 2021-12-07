const fse = require('fs-extra')
const fs = require('fs')


function read(path) {
    return fs.readFileSync(path, {encoding: "latin1"})
}

function write(path, data) {
    fs.writeFileSync(path, data, {encoding: "latin1"})
}

function writeJSON(path, data) {
    try {
        fse.writeJsonSync(path, data, {encoding: "latin1"})
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

module.exports = { read, write, writeJSON }