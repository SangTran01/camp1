var express 	= require('express');
var router 		= express.Router();
var Campground 	= require('../models/campground');
//Index - show all campgrounds
router.get('/',function(req,res){
	//console.log(req.user);

	//get data from db
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log('got the data');
			res.render('campgrounds/index', {campgrounds:allCampgrounds});
		}
	});
});

//Create -add new campgrounds
router.post('/', isLoggedIn, function(req,res){
	//var newCampGround = req.body;
	//campgrounds.push(newCampGround);
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	Campground.create({
		name:req.body.name,
		image:req.body.image,
		description:req.body.description,
		author: author
	}, function(err,campground){
		if(err){
			console.log(err);
		} else {
			console.log('newly created campground');
			console.log(campground);
			res.redirect('/campgrounds');
		}
	});	
});

//NEW - show form to create new campground
router.get('/new', isLoggedIn, function(req,res){
	res.render('campgrounds/new');
});

//SHOW specific campground
router.get('/:id', function(req,res){
	var id = req.params.id;
	Campground.findById(id).populate('comments').exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			//console.log(foundCampground);
			res.render('campgrounds/show',{campground:foundCampground});
		}
	});	
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;