const config = require("../config/config.json")
const qst = require('./text/questions.json')
const tmp = require('./text/latex_templates').template
const _answers = require('./util/terminal').read('./src/inputs/answers.csv')
const {choice_types} = require("./helper/model")
const {rm_umlaut, convert2umlaut, rm_quotes, rm_breaking_semicolons} = require('./helper/helper')
const args = process.argv

// ---------
// OPTIONS
// ---------
const course = config.course
const term = config.term
const instructor = config.instructor

const skipDesc = config.skipDesc
const skipType = config.skipType

const key_index = config.key_index
// ---------

const answers = rm_breaking_semicolons(_answers)
const lines = answers.split("\n")
const title = rm_quotes(lines[0]).split(";")
const keys = args.length > 2 ? args.filter((k, i) => i >= 2) : []

for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "") continue

    const e = lines[i].split(";")
    const key = rm_quotes(e[key_index])
    if (args.length > 2 && !keys.includes(key)) continue

    const remove_index = keys.indexOf(key)
    keys.splice(remove_index, 1)

    let tex = tmp.head(term, rm_quotes(e[key_index]), course, instructor) + tmp.doc.start

    for (let j = 5; j < e.length; j++) {
        if (title[j] === undefined) continue

        if (title[j].endsWith("]")) {
            const answer = rm_quotes(e[j])
            if (is_set(answer)) {
                tex += format_answer(add_answer(answer))
            }

        // Main Question Type Checks
        } else if (Object.keys(qst).includes(rm_umlaut(title[j]))) {
            // --------------------
            // Single Choice Frage
            // --------------------
            if (qst[rm_umlaut(title[j])].type === choice_types.single) {
                const answer = rm_quotes(e[j])
                if (is_set(answer)) {


                    tex += generate_qst(title[j], choice_types.single, qst[rm_umlaut(title[j])].value, format_answer(answer))
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

                        // check "Freitext" in multiple choice
                        if (title[k] === title[k + 1]) {
                            const new_answer = rm_quotes(e[k + 1])
                            answers.push(format_answer(new_answer))
                            k++

                        } else {
                            answers.push(format_answer(title[k].substring(0, title[k].length - 4)))
                        }
                    }
                    k++
                }

                if (answers.length !== 0) {
                    tex += generate_qst(title[j], choice_types.multiple, qst[rm_umlaut(title[j])].value, tmp.list(answers))
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
                    tex += generate_qst(title[j], choice_types.matrix, qst[rm_umlaut(title[j])].value, tmp.list(answers))
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
                    tex += generate_qst(title[j], qst[rm_umlaut(title[j])].type, qst[rm_umlaut(title[j])].value, format_answer(answer))
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
    require('./util/terminal').write(`./src/outputs/tex/${rm_quotes(e[key_index])}.tex`, tex)
    require('./util/terminal').writeLatex(`./src/outputs/pdf/${rm_quotes(e[key_index])}.pdf`, tex)
    console.log("successfully generate file for " + rm_quotes(e[key_index]))
}
console.log("\nThe following keys are not in the csv file:\n" + keys + "\n")

function generate_qst(title, type, description, answer) {
    let qst_tex = (skipType) ? tmp.questions.title(convert2umlaut(title)) :
        tmp.questions.title(convert2umlaut(title), type)

    if (!skipDesc) {
        qst_tex += tmp.questions.description(convert2umlaut(description))
    }

    qst_tex += tmp.questions.answer(convert2umlaut(answer))
    return qst_tex
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
