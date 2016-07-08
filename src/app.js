var express = require('express');
var parser = require('body-parser');
var app = express();

var urlEncodedParser = parser.urlencoded({extended:false});


app.set('view engine', 'jade');

app.get('/',function(req,res){
	res.render('landing');
})

app.get('/new',function(req,res){
	res.render('new');
})

var campgrounds = [
		{name:'Campsite 1', image:'https://farm4.staticflickr.com/3162/2642197987_2c71947286.jpg'},
		{name:'Campsite 2', image:'https://farm4.staticflickr.com/3162/2642197987_2c71947286.jpg'},
		{name:'Campsite 3', image:'https://farm4.staticflickr.com/3162/2642197987_2c71947286.jpg'},
		{name:'Campsite 4', image:'https://farm4.staticflickr.com/3162/2642197987_2c71947286.jpg'}
	];

app.get('/campgrounds',function(req,res){
	res.render('campgrounds', {campgrounds:campgrounds});
});

app.post('/campgrounds', urlEncodedParser, function(req,res){
	var newCampGround = req.body;
	campgrounds.push(newCampGround);
	res.redirect('/campgrounds');
})

app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000');
});