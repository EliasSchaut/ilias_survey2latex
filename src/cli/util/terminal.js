const latex = require('node-latex')
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

function writeLatex(path, data) {
    try {
        const output = fs.createWriteStream(path)
        const pdf = latex(data, { passes: 2 })

        pdf.pipe(output)
        pdf.on('error', err => console.error(err))
        pdf.on('finish', () => console.log('PDF generated!'))
    } catch (e) {
        console.log(e)
    }
}

module.exports = { read, write, writeJSON, writeLatex }