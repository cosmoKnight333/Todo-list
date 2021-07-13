const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
mongoose.connect('mongodb+srv://admin-cosmoknight:iamDev1!@cluster0.oxvbw.mongodb.net/todo-listDB', { useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model('Item', itemSchema);
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});
const List = mongoose.model('List', listSchema);



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
            res.render('list', { todoTitle: "Your Meds", newlist: item });
        }
    })


})

app.post('/', function(req, res) {
    var itemName = req.body.newItem;
    var listName = req.body.list;

    if (itemName != "") {

        if (listName === "Your Meds") {
            let item = new Item({
                name: itemName
            });
            item.save();
            res.redirect('/')

        } else {
            List.findOne({ name: listName }, function(err, foundList) {
                foundList.items.push({ name: itemName });
                foundList.save();
                res.redirect('/' + listName);
            })
        }
    }

})

app.post('/delete', function(req, res) {
    let rmItemId = (req.body.checkbox);
    let listName = req.body.listName;
    if (listName === "Your Meds") {
        Item.findByIdAndRemove(rmItemId, function(err) {
            if (err) {
                console.log(err);
            } else {

            }
        });
        res.redirect('/');
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: rmItemId } } }, function(err, found) {
            if (!err) {
                res.redirect('/' + listName);
            }
        })
    }
    console.log("checed item deleted");
})

app.get('/:customListName', function(req, res) {
    let costomName = _.capitalize(req.params.customListName);
    List.findOne({ name: costomName }, function(err, list) {
        if (!err) {
            if (!list) {
                console.log("new list " + costomName + " added");

                const list = new List({
                    name: costomName,
                    items: []
                });
                list.save();
                res.redirect('#');
            } else {
                res.render("list", { todoTitle: costomName, newlist: list.items })
            }
        }
    })



})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}


app.listen(port, function() {
    console.log("server started successfully");
})