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
const Item = mongoose.model('Item', itemSchema);
const item1 = new Item({
    name: "hello1"
});
const item2 = new Item({
    name: "hello2"
});
const item3 = new Item({
        name: "hello3"
    })
    // Item.insertMany([item1, item2, item3], function(err) {
    //     if (err) { console.log(err); } else console.log("added");
    // });

app.get('/', function(req, res) {

    var today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);


    Item.find({}, function(err, item) {
        if (err) {
            console.log(err);
        } else {
            res.render('list', { todoTitle: day, newlist: item });
        }
    })


})

app.post('/', function(req, res) {
    var itemName = req.body.newItem;
    var item;
    if (itemName != "") {
        item = {
            name: itemName
        };
        Item.insertMany([item], function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(itemName + " added");
            }
        })
    }

    res.redirect('/')
})

app.post('/delete', function(req, res) {
    rmItemId = (req.body.checkbox);
    Item.findByIdAndRemove(rmItemId, function(err) {
        if (err) {
            console.log(err);
        }

    });
    res.redirect('/');
})

app.listen(4000, function() {
    console.log("server at 4000")
})