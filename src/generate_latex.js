const qst = require('./text/questions.json')
const tmp = require('./text/latex_templates').template
const answers = require('./util/terminal').read('./inputs/answers.csv')
const { choice_types } = require("./helper/model")
const { rm_umlaut, convert2umlaut, rm_quotes } = require('./helper/helper')


const lines = answers.split("\n")
const title = rm_quotes(lines[0]).split(";")
for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "") continue

    const e = lines[i].split(";")
    let tex = tmp.head(rm_quotes(e[2])) + tmp.doc.start

    for (let j = 5; j < e.length; j++) {
        const answer = rm_quotes(e[j])

        if (!is_set(answer)) continue
        if (title[j].endsWith("]")) {

        }
        if (Object.keys(qst).includes(rm_umlaut(title[j]))) {

            // --------------------
            // Single Choice Frage
            // --------------------
            if (qst[rm_umlaut(title[j])].type === choice_types.single) {
                if (!answer.match(/[0-9]*/g)) {
                    tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, answer)
                }
            }
            // -------------------

            // --------------------
            // Multiple Choice Frage
            // --------------------
            if (qst[rm_umlaut(title[j])].type === choice_types.multiple) {
                const tmp_answers = []
                let k = (j + 1)

                while (title[j].endsWith("]")) {
                    const tmp_answer = rm_quotes(e[j])
                    if (is_set(tmp_answer)) {
                        tmp_answers.push(title[k].substring(0, title.length - 3))
                    }
                    k++
                }

                tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, tmp_answers.join(", "))
                j = k
            }
            // -------------------


            // --------------------
            // Matrix Choice Frage
            // --------------------
            if (qst[rm_umlaut(title[j])].type === choice_types.matrix) {

            }
            // -------------------

            // --------------------
            // else || Freitext eingeben || Metrische Frage
            // --------------------
            else {
                tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, answer)
            }
            // --------------------
        } else {

        }
    }


    tex += tmp.doc.end
    require('./util/terminal').write(`./outputs/${rm_quotes(e[2])}.tex`, tex)
    console.log("successfully generate file for " + rm_quotes(e[2]))
}

function generate_qst(title, description, answer) {
    return tmp.questions.title(convert2umlaut(title))
        + tmp.questions.description(convert2umlaut(description))
        + tmp.questions.answer(convert2umlaut(answer))
}

function is_set(key) {
    return !(key === "" || key.toLowerCase() === "übersprungen" || key.toLowerCase() === "")
}
