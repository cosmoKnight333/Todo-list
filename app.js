const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/todo-listDB', { useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = new mongoose.Schema({
    name: String,
});
var pdate = new Date();
var ndate;
app.get('/', function(req, res) {
    ndate = new Date();
    var today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render('list', { todoTitle: day, newlist: items });

})

app.post('/', function(req, res) {
    var item = req.body.newItem;
    if (item != "") {
        items.push(item);

    }

    res.redirect('/')
})

app.listen(4000, function() {
    console.log("server at 4000")
})