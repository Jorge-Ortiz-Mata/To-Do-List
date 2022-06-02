const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
// -------- DATE section. -----------
const day = require(__dirname + "/date.js");
// ---------------- APP Configuration -------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/toDoList", { useNewUrlParser: true });
// ---------------- Create SCHEMAS -----------------
const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
});
// ---------------- Create MODELS ----------------
const Item = mongoose.model("Item", itemSchema);
// -------------------- GET ------------------
app.get("/", (req, res) => {
    Item.find({}, function(err, items){
        res.render('pages/index', {currentDate: day.getDate(), items: items});
    });
});

app.get("/about", (req, res) => {
    res.render('pages/about');
});
// -------------------- POST ------------------
app.post("/items", (req, res) => {
    let itemName  = req.body.item;
    const item = new Item({
        name: itemName,
        date: day.getDate()
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const deleteItem = req.body.checkbox;
    Item.deleteOne({name: deleteItem}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Item successfully deleted.");
            res.redirect('/');
        }
    });
});
// -------------------- PORTS ------------------

app.listen(process.env.PORT || port, () => {
    console.log("Listening on port 4000");
});
