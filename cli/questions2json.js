const input = require("./util/terminal").read('./src/inputs/questions.csv')
const { rm_umlaut, rm_txt } = require('./helper/helper')
const output = {}

const lines = []
let cp_count = 0
for (const line of input.split("\n")) {
    if (line.startsWith("<p>")) {
        lines[lines.length - 1] += rm_txt(line)
    } else if (line === '') {
        // do nothing

    } else if (line.startsWith('""')) {
        lines.push(`${lines[lines.length - 1 - cp_count].split(";")[0]} [${++cp_count}]${rm_txt(line)}`)

    } else {
        lines.push(rm_txt(line))
        cp_count = 0
    }
}

let first_time = true
for (const line of lines) {
    if (first_time) {
        first_time = false
        continue
    }

    const e = line.split(";")
    const key = rm_umlaut(e[0])
    output[key] = {
        value: rm_umlaut(e[1]),
        type: rm_umlaut(e[2])
    }
}

require('./util/terminal').writeJSON('./src/text/questions.json', output)
