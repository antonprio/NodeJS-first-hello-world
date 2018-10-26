var express = require('express');
var app = express();
var route = require('./things.js');
var bodyParser = require('body-parser');

//Untuk parsing URL yang di encode
app.use(bodyParser.urlencoded({extended: false}));

//Untuk parsing json data
app.use(bodyParser.json());

//Load static file
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/first', function(req, res){
    res.render('first_view');
});

app.use('/things', function(req, res, next){
    console.log("Request diterima pada tanggal: " + Date.now());
    next();
})

app.use('/', route);

app.listen(3000);