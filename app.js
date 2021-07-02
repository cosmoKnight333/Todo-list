const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

var items = ["utho", "bakchodi karo", "so jaao"];
var pdate = new Date();
app.get('/', function(req, res) {
    var ndate = new Date();
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
        console.log(item);
    }
    if (pdate != ndate) {
        items = [];
        pdate = ndate;
    }
    res.redirect('/')
})

app.listen(4000, function() {
    console.log("server at 4000")
})