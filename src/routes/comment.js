var express = require('express');
// mergeParams : true
//allows the params to be used inside comment routes
var router = express.Router({mergeParams:true});  
var Campground = require('../models/campground');
var Comment = require('../models/comment');


//Comments New
router.get('/new', isLoggedIn, function(req,res){
	var id = req.params.id;
	Campground.findById(id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('comments/new',{campground:foundCampground});
		}
	});
});

//POST NEW COMMENTS
//TODO add date and time of new comment
router.post('/', isLoggedIn,function(req,res){
	//lookup campground using ID
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
	var id = req.params.id;
	Campground.findById(id, function(err, foundCampground){
		if(err){
			console.log(err);
			redirect('/campgrounds');
		} else {
			console.log(req.body);
			Comment.create({
				text : req.body.text,
				author:req.body.author
			}, function(err,comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect('/campgrounds/' + foundCampground._id);
				}
			});
		}
	});
});


//middleware
//TODO: move out
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;