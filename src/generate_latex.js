const qst = require('./text/questions.json')
const tmp = require('./text/latex_templates').template
const asw = require('./terminal').read('./inputs/answers.csv')
const { rm_umlaut, convert2umlaut, rm_quotes } = require('./helper')

const lines = asw.split("\n")
const head = rm_quotes(lines[0]).split(";")
for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "") continue

    const e = lines[i].split(";")
    let tex = tmp.head(rm_quotes(e[2])) + tmp.doc.start

    for (let j = 5; j < e.length; j++) {
        const key = rm_quotes(e[j])

        if (!is_set(key)) continue
        if (head[j].endsWith("]")) {

        } else {
            if (Object.keys(qst).includes(rm_umlaut(head[j]))) {
                tex += tmp.questions.title(convert2umlaut(head[j]))
                    + tmp.questions.description(convert2umlaut(qst[rm_umlaut(head[j])].value))
                    + tmp.questions.answer(convert2umlaut(key))
            }
        }
    }


    tex += tmp.doc.end
    require('./terminal').write(`./outputs/${rm_quotes(e[2])}.tex`, tex)
    console.log("successfully generate file for " + rm_quotes(e[2]))
}

function is_set(key) {
    return !(key === "" || key.toLowerCase() === "übersprungen" || key.toLowerCase() === "")
}
