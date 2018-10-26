var express = require('express');
var router = express.Router();

router.get('/:id([0-9]{5})', function(req, res){
    res.send("The id of the get method is: "+req.params.id);
});

router.get('/things', function(req, res){
    res.send("Time logged");
});

router.post('/', function(req, res){
    res.send("POST route on things");
});

router.get('/dynamic', function(req, res) {
    res.render('dynamic', {
        name: "Anton Prio",
        url: "www.dataon.com",
        user: {name: "test", age: "23"}
    });
});

router.get('*', function(req, res){
    res.send("Cannot find your method");
});

module.exports = router;