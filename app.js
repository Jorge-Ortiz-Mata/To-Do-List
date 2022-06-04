const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
const port = 4000;
// -------------------------------------------
// -------- DATE section. -----------
const day = require(__dirname + "/date.js");
// -------------------------------------------
// ---------------- APP Configuration -------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://admin-jorge:j0rge.107@to-do-list-cluster.in43m1e.mongodb.net/toDoList", { useNewUrlParser: true });
// -------------------------------------------
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

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});
// -------------------------------------------
// ---------------- Create MODELS ----------------
const Item = mongoose.model("Item", itemSchema);    // It creates a collection with the itemSchema.
const List = mongoose.model("List", listSchema);
// -------------------------------------------
// -------------------- GET ------------------
app.get("/", (req, res) => {
    res.render('pages/list', {name: "Home", items: []});
});

app.get("/about", (req, res) => {
    res.render('pages/about');
});

app.get("/lists/:page", (req, res) => {
    const page = _.capitalize(req.params.page);
    List.findOne({name: page}, function (err, currentList) {
        if(!currentList){
            const newList = new List({
                name: page,
                items: []
            });
            newList.save();
            res.redirect("/lists/" + page);
        } else {
            res.render('pages/list', {name: currentList.name, items: currentList.items});
        }
    });
})
// -------------------------------------------
// -------------------- POST ------------------
app.post("/", (req, res) => {
    const itemName  = req.body.item;
    const listName = req.body.button;
    const item = new Item({
        name: itemName,
        date: day.getDate()
    });
    if(listName === "Index"){
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, list){
            list.items.push(item);
            list.save();
            res.redirect('/lists/' + listName);
        });
    }
});

app.post("/delete", (req, res) => {
    const {item, list} = req.body;
    List.findOneAndUpdate({name: list}, {$pull: {items: {name: item}}}, function(err, results){
        err ? console.log(err) : res.redirect('/lists/' + list);
    });
});
// -------------------------------------------
// -------------------- PORTS ------------------
app.listen(process.env.PORT || port, () => {
    console.log("Listening on port 4000");
});
