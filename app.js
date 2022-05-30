const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

// -------- DATE section. -----------

const day = require(__dirname + "/date.js");

// ---------- ITEMS section -----------

const listItems = [];
let item = '';

// ---------------- ends -------------------

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// -------------------- GET ------------------

app.get("/", (req, res) => {
    res.render('pages/index', {currentDate: day, items: listItems});
});

app.get("/about", (req, res) => {
    res.render('pages/about');
});

// -------------------- POST ------------------

app.post("/items", (req, res) => {
    item  = req.body.item;
    listItems.push(item);
    res.redirect("/");
});

// -------------------- PORTS ------------------

app.listen(port, () => {
    console.log("Listening on port 4000");
});
