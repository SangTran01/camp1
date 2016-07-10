var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var urlEncodedParser = parser.urlencoded({extended:false});

mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'jade');

var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
// 	name:"Campsite 2",
// 	image:'https://farm4.staticflickr.com/3162/2642197987_2c71947286.jpg',
// 	description:"This is a decscription for lala"
// }, function(err,campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log('newly created campground');
// 		console.log(campground);
// 	}
// })


app.get('/',function(req,res){
	res.render('landing');
})


//Index - show all campgrounds
app.get('/campgrounds',function(req,res){
	//get data from db
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log('got the data');
			res.render('index', {campgrounds:allCampgrounds});
		}
	})
});

//Create -add new campgrounds
app.post('/campgrounds', urlEncodedParser, function(req,res){
	//var newCampGround = req.body;
	//campgrounds.push(newCampGround);
	Campground.create({
		name:req.body.name,
		image:req.body.image,
		description:req.body.description
	}, function(err,campground){
		if(err){
			console.log(err);
		} else {
			console.log('newly created campground');
			console.log(campground);
			res.redirect('/campgrounds');
		}
	});	
})

//NEW - show form to create new campground
app.get('/campgrounds/new',function(req,res){
	res.render('new');
})

//SHOW specific campground
app.get('/campgrounds/:id', function(req,res){
	var id = req.params.id;
	Campground.findById(id, function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render('show',{campground:foundCampground});
		}
	})	
})

app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000');
});