var Campground 		= require('../models/campground');
var Comment 		= require('../models/comment');
var middlewareObj 	= {};

middlewareObj.checkCampgroundUser = function(req,res,next){
	if(req.isAuthenticated()){
		var id = req.params.id;
		Campground.findById(id, function(err,foundCampground){
			if(err){
				req.flash('error', 'Campground not found');
				res.redirect('back');
			} else {
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

middlewareObj.checkCommentUser = function(req,res,next){
	if(req.isAuthenticated()){
		var id = req.params.comment_id;
		Comment.findById(id, function(err,foundComment){
			if(err){
				res.redirect('back');
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', "You need to be logged in to do that");
		res.redirect('back');
	}
};


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error', 'You need to be logged in to do that!');
		res.redirect('/login');
	}
};

module.exports = middlewareObj;

