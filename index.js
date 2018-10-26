var express = require('express');
var app = express();
var route = require('./things.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model('Person', personSchema);

app.get('/', function(req, res){
    res.render('form');
});

app.get('/person', function(req, res){
    res.render('person');
});

app.set('view engine', 'pug');
app.set('views', './views');

//Parsing application/json
app.use(bodyParser.json());

//Parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded

//Parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/person', function(req, res) {
    var personInfo = req.body; //Untuk melihat informasi yang di parsing
    console.log(req.body);

    
    if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: "Undefined attributes",
            type: "error"
        });
    }
    else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save(function(err, Person) {
            if(err) {
                res.render('show_message', {
                    message: "Database Error",
                    type: "error"
                });
            }
            else {
                res.render('show_message', {
                    message: "New Person Added",
                    type: "success",
                    person: personInfo
                });
            }
        });
    }
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send("Receive your request");
});

app.listen(3000);