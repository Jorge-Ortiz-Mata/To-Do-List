const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// -------------------- GET ------------------

app.get("/", (req, res) => {
    res.render('index', {foo: 3354})
})

// -------------------- PORTS ------------------

app.listen(port, () => {
    console.log("Listening on port 4000");
})
