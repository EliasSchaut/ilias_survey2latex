const qst = require('./text/questions.json')
const tmp = require('./text/latex_templates').template
const answers = require('./util/terminal').read('./inputs/answers.csv')
const { choice_types } = require("./helper/model")
const { rm_umlaut, convert2umlaut, rm_quotes } = require('./helper/helper')
const course = "Umfrage Beratungsgespräch"
const term = "Ezzi"
const instructor = "Christine Glaubitz"
const args = process.argv

const lines = answers.split("\n")
const title = rm_quotes(lines[0]).split(";")
for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "") continue

    const e = lines[i].split(";")
    if (args.length !== 0 && !args.includes(rm_quotes(e[2]))) continue

    let tex = tmp.head(course, rm_quotes(e[2]), term, instructor) + tmp.doc.start

    for (let j = 5; j < e.length; j++) {
        if (title[j].endsWith("]")) {
            const answer = rm_quotes(e[j])
            if (is_set(answer)) {
                tex += format_answer(add_answer(answer))
            }
        }
        else if (Object.keys(qst).includes(rm_umlaut(title[j]))) {
            // --------------------
            // Single Choice Frage
            // --------------------
            if (qst[rm_umlaut(title[j])].type === choice_types.single) {
                const answer = rm_quotes(e[j])
                if (is_set(answer)) {
                    tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, format_answer(answer))
                    j++
                }
            }
            // -------------------

            // --------------------
            // Multiple Choice Frage
            // --------------------
            else if (qst[rm_umlaut(title[j])].type === choice_types.multiple) {
                const answers = []
                let k = (j + 1)

                while (title[k].endsWith("]")) {
                    const answer = rm_quotes(e[k])
                    if (is_set(answer)) {
                        answers.push(format_answer(title[k].substring(0, title[k].length - 4)))
                    }
                    k++
                }

                if (answers.length !== 0) {
                    tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, answers.join(", "))
                }
                j = k - 1
            }
            // -------------------


            // --------------------
            // Matrix Choice Frage
            // --------------------
            else if (qst[rm_umlaut(title[j])].type === choice_types.matrix) {
                const answers = []

                let k = (j + 1)
                let counter = 1

                while (qst[`${rm_umlaut(title[j])} [${counter}]`]) {
                    const answer = rm_quotes(e[k])
                    if (is_set(answer)) {
                        answers.push(format_answer(qst[`${rm_umlaut(title[j])} [${counter}]`].value + ": " + rm_quotes(e[k])))
                    }
                    k = k + 2
                    counter++
                }

                if (answers.length !== 0) {
                    tex += tmp.questions.title(title[j])
                        + tmp.questions.description(convert2umlaut(qst[rm_umlaut(title[j])].value))
                        + generate_qst(title[j], qst[rm_umlaut(title[j])].value, answers.join(", "))
                }
                j = k - 1
            }
            // -------------------

            // --------------------
            // else || Freitext eingeben || Metrische Frage
            // --------------------
            else {
                const answer = rm_quotes(e[j])
                if (is_set(answer)) {
                    tex += generate_qst(title[j], qst[rm_umlaut(title[j])].value, format_answer(answer))
                }
            }
            // --------------------
        } else {
            const answer = rm_quotes(e[j])
            if (is_set(answer)) {
                tex += add_answer(format_answer(answer))
                j++
            }
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

function add_answer(answer) {
    return tmp.questions.add_answer(answer)
}

function format_answer(answer) {
    return answer.replaceAll("%", "\\%")
}

function is_set(key) {
    return !(key === "" || key.toLowerCase() === "übersprungen" || key.toLowerCase() === "")
}
