var express 	= require('express');
// mergeParams : true
//allows the params to be used inside comment routes
var router 		= express.Router({mergeParams:true});  
var Campground 	= require('../models/campground');
var Comment 	= require('../models/comment');
var middleware 	= require('../middleware/index');


//Comments New
router.get('/new', middleware.isLoggedIn, function(req,res){
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
router.post('/', middleware.isLoggedIn,function(req,res){
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
					req.flash('error', "Something went wrong");
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCampground.comments.push(comment);
					foundCampground.save();
					req.flash('success', "Successfully added comment");
					res.redirect('/campgrounds/' + foundCampground._id);
				}
			});
		}
	});
});

//EDIT COMMENT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentUser, function(req,res){
	var comment_id = req.params.comment_id;
	var campground_id = req.params.id;
	Comment.findById(comment_id,function(err,foundComment){
		if(err){
			console.log(err);
		} else {
			//console.log(foundComment);
			res.render('comments/edit', {campground_id: campground_id, comment:foundComment});
		}
	});
});

//UPDATE COMMENT ROUTE
router.put('/:comment_id', middleware.checkCommentUser,function(req,res){
	var comment_id = req.params.comment_id;
	Comment.findByIdAndUpdate(comment_id, req.body, function(err,updatedComment){
		if(err){
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DELETE COMMENT ROUTE
router.delete('/:comment_id', middleware.checkCommentUser, function(req,res){
	var comment_id = req.params.comment_id;
	Comment.findByIdAndRemove(comment_id,function(err){
		if(err){
			res.redirect('back');
		} else {
			req.flash('success', "Comment deleted");
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});


module.exports = router;