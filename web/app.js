
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const config = require("../config/config.json")
const port = config.port
const app = express()

const upload = multer()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '\\wwwroot\\')))
app.use(upload.array())


// -----------------------------------
// Routes
// -----------------------------------
app.post('/upload', upload.single("uploaded_file"), function(req, res) {
    console.log(req.body)
    res.send("OK")
});
// -----------------------------------


// -----------------------------------
// LISTEN
// -----------------------------------
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
// -----------------------------------
