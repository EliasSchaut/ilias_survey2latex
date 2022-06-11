
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const config = require("../config/config.json")
const app = express()

const port = config.port
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '\\wwwroot\\')))

// -----------------------------------
// LISTEN
// -----------------------------------
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
// -----------------------------------
