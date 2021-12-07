function rm_quotes(str) {
    return str.replaceAll(/"/g, '')
}

function rm_txt(str) {
    return str.replaceAll(/"|<(\/)?p>|<(\/)?span>|__/g, '').replaceAll(" ", ' ')
}

function rm_umlaut(str) {
    return str.replaceAll("ö", "oe").replaceAll("ä", "ae").replace("ü", "ue")
        .replaceAll("Ö", 'Oe').replaceAll('Ä', 'Ae').replaceAll('Ü', 'Ue')
}

function convert2umlaut(str) {
    return str.replaceAll("oe", "ö").replaceAll("ae", "ä").replace("ue", "ü")
        .replaceAll("Oe", 'Ö').replaceAll('Ae', 'Ä').replaceAll('Ue', 'Ü')
}

module.exports = { rm_quotes, rm_txt, rm_umlaut, convert2umlaut }
