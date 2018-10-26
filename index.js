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

app.post('/', function(req, res) {
    console.log(req.body);
    res.send("Receive your request");
});

app.listen(3000);