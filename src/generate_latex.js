const qst = require('./text/questions.json')
const tmp = require('./text/latex_templates').template
const asw = require('./terminal').read('./inputs/answers.csv')

const lines = asw.split("\n")
const head = rm_txt(lines[0]).split(";")
for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "") continue

    const e = lines[i].split(";")
    let tex = tmp.head(e[2]) + tmp.doc.start

    for (let j = 5; j < e.length; j++) {
        const key = rm_txt(e[i])
        if (!is_set(key)) continue


        if (head[j].endsWith("]")) {

        } else {
            if (Object.keys(qst).includes(qst[convert_umlaut(head[j])])) {
                tex += tmp.questions.title(head[j])
                    + tmp.questions.description(qst[convert_umlaut(head[j])].value)
                    + tmp.questions.answer(key)
            }
        }
    }


    tex += tmp.doc.end
    require('./terminal').write(`./outputs/${rm_txt(e[2])}.tex`, tex)
    console.log("successfully generate file for " + rm_txt(e[2]))
}

function rm_txt(str) {
    return str.replaceAll(/"/g, '')
}

function convert_umlaut(str) {
    return str.toLowerCase().replaceAll("ö", "oe").replaceAll("ä", "ae").replace("ü", "ue")
}

function is_set(key) {
    return !(key === "" || key.toLowerCase() === "übersprungen" || key.toLowerCase() === "")
}
