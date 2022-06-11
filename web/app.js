
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();
const path = require('path')
const config = require("../config/config.json")
const port = config.port
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '\\wwwroot\\')))
app.use(upload.array());


// -----------------------------------
// Routes
// -----------------------------------
app.post('/', function(req, res){
    console.log("asd")
    console.log(req.body);
    res.send("received your request!");
});
// -----------------------------------


// -----------------------------------
// LISTEN
// -----------------------------------
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
// -----------------------------------
