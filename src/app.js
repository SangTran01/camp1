var express          		= require('express');
var parser           		= require('body-parser');
var mongoose         		= require('mongoose');
var app              		= express();
//add ./ when same directory as app.js
var Campground      		= require('./models/campground');
var Comment         		= require('./models/comment'); 
var User             		= require('./models/user'); 
var seedDB           		= require('./seeds');
var passport 				= require('passport');
var localStrategy 			= require('passport-local');
var passportLocalMongoose 	= require('passport-local-mongoose'); 


mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(parser.urlencoded({extended:true}));
seedDB();

//Passport configuration
app.use(require('express-session')({
	secret:'this is secret',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	//locals let req.user be available to all routes
	res.locals.currentUser = req.user;
	next();
})

//ROUTES
app.get('/',function(req,res){
	res.render('landing');
})


//Index - show all campgrounds
app.get('/campgrounds',function(req,res){
	console.log(req.user);

	//get data from db
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log('got the data');
			res.render('campgrounds/index', {campgrounds:allCampgrounds});
		}
	})
});

//Create -add new campgrounds
app.post('/campgrounds', function(req,res){
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
	res.render('campgrounds/new');
})

//SHOW specific campground
app.get('/campgrounds/:id', function(req,res){
	var id = req.params.id;
	Campground.findById(id).populate('comments').exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('campgrounds/show',{campground:foundCampground});
		}
	})	
})



//===============
// COMMENTS ROUTES
//===============

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req,res){
	var id = req.params.id;
	Campground.findById(id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('comments/new',{campground:foundCampground});
		}
	})
});

//POST NEW COMMENTS
//TODO add date and time of new comment
app.post('/campgrounds/:id/comments', isLoggedIn,function(req,res){
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
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect('/campgrounds/' + foundCampground._id);
				}
			})
		}
	})
})

//AUTH ROUTES
//=============

app.get('/register', function(req,res){
	res.render('register');
})
//REGISTER ROUTES 
app.post('/register', function(req,res){
	var newUser = new User({
		username:req.body.username
	})
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		} 
		passport.authenticate('local')(req,res,function(){
			res.redirect('/campgrounds');
		})
	})
})

//LOGIN ROUTES
app.get('/login', function(req,res){
	res.render('login');
})

//handle login logic
app.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}), function(req,res){

})

//LOGOUT ROUTE
app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/campgrounds');
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000');
});