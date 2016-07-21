var express 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');
var User 		= require('../models/user');
var middleware 	= require('../middleware/index');
var Campground = require('../models/campground');

//ROUTES
router.get('/',function(req,res){
	Campground.find({}, 'image', function(err,foundCampgrounds){
		if(err){
			console.log(err);
		} else {
			var pictures = [];
			for(var i = 0; i < foundCampgrounds.length; i++){
				//console.log(foundCampgrounds[i].image);
				pictures.push(foundCampgrounds[i].image);
			}
			res.render('landing', {pictures:pictures});
		}
	});
});


router.get('/register', function(req,res){
	res.render('register');
});
//REGISTER ROUTES 
router.post('/register', function(req,res){
	var newUser = new User({
		username:req.body.username
	});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			req.flash('error', err.message);
			return res.render('register');
		} 
		passport.authenticate('local')(req,res,function(){
			req.flash('success', "Welcome to YelpCamp " + user.username);
			res.redirect('/campgrounds');
		});
	});
});

//LOGIN ROUTES
router.get('/login', function(req,res){
	res.render('login');
});

//handle login logic
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}), function(req,res){

});

//LOGOUT ROUTE
router.get('/logout', function(req,res){
	req.logout();
	req.flash('error', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;