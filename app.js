const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("To Do List.")
})

app.listen(port, () => {
    console.log("Listening on port 4000");
})
