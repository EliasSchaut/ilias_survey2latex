const template = {
    questions: {
        title: function (title, type) {return `\n\\question \\textbf{${title}} \\gray(${type}) : `},
        title: function(title) {return `\n\\question \\begin{tabular}{p{0.25\\linewidth}} \\small\\textbf{${title} :} \\end{tabular}` },
        description: function (text) {return `\\textit{${text}}\\\\\n`},
        answer: function (answer) {
            return `\\begin{minipage}[t]{0.65\\paperwidth}\n {${answer}\n}\n \\end{minipage}\n \n \\hrulefill`
        },
        add_answer: function (answer) {return `\\textbf{${answer}}\n`}
    },
    list: function (str_arr) {
        return "\n"
            + "\\begin{minipage}[t]{0.65\\paperwidth}"
            + "\\begin{itemize}[leftmargin=*]"
            + str_arr.map(function (e) {
                return "\\item " + e
            }).join("\n")
            + "\\end{itemize}"
            + "\n\\end{minipage}"
    },
    doc: {
      start: "% -------------------\n" +
          "% Content\n" +
          "% -------------------\n" +
          "\\begin{document}\n" +
          "\\titleinfo\n" +
          "\n" +
          "% ---------\n" +
          "% Questions\n" +
          "% ---------\n" +
          "\\begin{questions}\n",
        end: "\\end{questions}\n" +
            "\\end{document}\n"
    },
    head: function (course, title, term, instructor) {
        return "\\documentclass[11pt,A4]{exam}\n" +
        "\\usepackage[lmargin=0.5in,rmargin=0.5in,tmargin=0.5in,bmargin=0.5in]{geometry}\n" +
        "\\printanswers\n" +
        "\n" +
        "\n" +
        "\\usepackage{setspace} \n" +
        "\\setstretch{0.5} \n" + 
        "% Exam Class Documentation: https://ctan.org/pkg/exam?lang=en \n" +
        "% Compile at least twice, always.\n" +
        "\n" +
        "% -------------------\n" +
        "% Packages\n" +
        "% -------------------\n" +
        "\\usepackage{\n" +
        "\tamsmath,\t\t\t% Math Environments\n" +
        "\tamssymb,\t\t\t% Extended Symbols\n" +
        "\tenumitem,\t\t    % Enumerate Environments\n" +
        "\tgraphicx,\t\t\t% Include Images\n" +
        "\tmulticol,\t\t\t% Use Multi-columns\n" +
        "\tmultirow,\t\t\t% Use Multi-rows\n" +
        "\ttabularx,\t\t\t% Tabular Environment for T/F\n" +
        "\ttikz,\t\t\t\t% Create Tikz Diagrams\n" +
        "\ttkz-euclide\t\t    % Automate Graph Plots\n" +
        "}\n" +
        "\n" +
        "\\setlist[itemize]{leftmargin=*}" +
        "\n" +
        "% -------------------\n" +
        "% Course & Exam Information\n" +
        "% -------------------\n" +
        `\\newcommand{\\course}{${course}}\n` +
        `\\newcommand{\\coursetitle}{${title}}\n` +
        "\\newcommand{\\examnumber}{}\n" +
        `\\newcommand{\\term}{${term}}\n` +
        `\\newcommand{\\instructor}{${instructor}}\n` +
        "\\newcommand{\\gray}[1]{\\textcolor{gray}{#1}}" +
        "\n" +
        "\n" +
        "% -------------------\n" +
        "% Font\n" +
        "% -------------------\n" +
        "\\usepackage[T1]{fontenc}\n" +
        "\\usepackage{charter}\n" +
        "\\qformat{}\n" +
        "\n" +
        "\n" +
        "% -------------------\n" +
        "% Title Page Commands\n" +
        "% -------------------\n" +
        "\\newcommand{\\examtitle}{\\noindent \\textbf{\\course} \\hfill \\textbf{Name: } \\underline{\\hspace{7cm}} \\\\ \\textbf{\\term} \\\\ \\textbf{\\examdate} \\\\ \\textbf{\\timelimit} \\\\[0.2cm] \\rule[2ex]{\\textwidth}{2pt}}\n" +
        "\\newcommand{\\instructions}[1]{%\n" +
        "\t\\begin{center}\n" +
        "\t\\fbox{\\fbox{\\parbox{6in}{\\centering #1}}}\n" +
        "\t\\end{center} \\vspace{0.1cm}\n" +
        "}\n" +
        "\\newcommand{\\scores}{\n" +
        "\t\\begin{center}\n" +
        "\t\\addpoints\n" +
        "\t\\gradetable[h][questions]\t% v: vertical scores; h: horizontal scores\n" +
        "\t\\end{center}\n" +
        "}\n" +
        "\\newcommand{\\bottomline}{\\vfill\\noindent \\rule[2ex]{\\textwidth}{2pt}}\n" +
        "\\newcommand{\\titleinfo}{\\textbf{\\course}\\hfill \\textbf{\\coursetitle} \\hfill \\textbf{\\term} \\hfill \\textbf{\\instructor}}\n" +
        "\\newcommand{\\noticeline}{\\begin{center}{\\scriptsize\\textbf{Do not write below this line}} \\rule{\\textwidth}{0.5pt}\\end{center}}\n" +
        "\\newcommand{\\directions}{\\begin{center} \\textbf{Instructions} \\end{center}}\n" +
        "\\newcommand{\\answer}[1]{\\hspace{\\linewidth}\\vfill\\noindent\\fbox{\\begin{minipage}{\\textwidth}\\textbf{Answer:}\\vspace{#1} \\end{minipage}}}\n" +
        "\n" +
        "\n" +
        "% -------------------\n" +
        "% Commands\n" +
        "% -------------------\n" +
        "\\newenvironment{2enumerate}{%\n" +
        "\t\\begin{enumerate}[(a)]\n" +
        "\t\\begin{multicols}{2}\n" +
        "\t}{%\n" +
        "\t\\end{multicols}\n" +
        "\t\\end{enumerate}\n" +
        "}\n" +
        "\n" +
        "% T/F\n" +
        "\\newcounter{abc}\n" +
        "\\renewcommand{\\theabc}{\\stepcounter{abc}\\alph{abc}}\n" +
        "\\newcommand{\\pspace}{\\par\\vspace{\\baselineskip}}\n" +
        "\n" +
        "% Check Marks\n" +
        "\\usepackage{pifont}\n" +
        "\\newcommand{\\cmark}{\\ding{51}}\n" +
        "\\newcommand{\\xmark}{\\ding{55}}\n" +
        "\n" +
        "\n" +
        "% -------------------\n" +
        "% Header & Footer\n" +
        "% -------------------\n" +
        "\\pagestyle{head}\n" +
        "\\firstpageheader{}{}{}\n" +
        "\\runningheader{\\course}{}{\\thepage\\ of \\numpages}\n" +
        "\\runningheadrule\n" +
        "\n"
    }
}

module.exports = { template }
