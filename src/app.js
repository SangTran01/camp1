var express          		= require('express');
var parser           		= require('body-parser');
var mongoose         		= require('mongoose');
var flash 					= require('connect-flash');
var app              		= express();
//add ./ when same directory as app.js
var Campground      		= require('./models/campground');
var Comment         		= require('./models/comment'); 
var User             		= require('./models/user'); 
var seedDB           		= require('./seeds');
var passport 				= require('passport');
var localStrategy 			= require('passport-local');
var passportLocalMongoose 	= require('passport-local-mongoose'); 
var methodOverride 			= require('method-override');
//requiring routes
var campgroundRoutes 		= require('./routes/campground');
var commentRoutes 			= require('./routes/comment');
var authRoutes 				= require('./routes/auth');

mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(parser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

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
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//dry up code
//all campgroundRoutes should start with /campgrounds etc..
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);


app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000');
});