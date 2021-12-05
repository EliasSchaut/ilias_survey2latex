const input = require("./terminal").read('./inputs/questions.csv')
const output = {}

const lines = []
for (const line of input.split("\n")) {
    if (line.startsWith("<p>")) {
        lines[lines.length - 1] += line
    } else {
        lines.push(line)
    }
}

let first_time = true
for (const line of lines) {
    if (first_time) {
        first_time = false
        continue
    }

    const e = line.split(";")
    console.log(line)
    const key = e[0].replace('"', '')
    output[key] = {
        value: e[1].replace('"', ''),
        type: e[2].replace('"', '')
    }
}

function removeUnwantedText(str) {
    let output
    output = str.replace('"', '')
    output = str.replace('<p>', '')
    output = str.replace('</p>', '')
    return output
}

require('./terminal').writeJSON('./text/questions.json', output)
