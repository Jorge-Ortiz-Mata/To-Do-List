const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

// -------- DATE section. -----------

const options = {weekday: "long", day: "numeric", month: "long"};
const today = new Date();
const day = today.toLocaleDateString("en-US", options);
console.log(day);

// ---------- ITEMS section -----------

let listItems = [];
let item = '';

// ---------------- ends -------------------

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// -------------------- GET ------------------

app.get("/", (req, res) => {
    res.render('index', {currentDate: day, items: listItems});
});

// -------------------- POST ------------------

app.post("/", (req, res) => {
    item  = req.body.item;
    listItems.push(item);
    res.redirect("/");
});

// -------------------- PORTS ------------------

app.listen(port, () => {
    console.log("Listening on port 4000");
});
