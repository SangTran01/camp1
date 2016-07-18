var mongoose   = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
var data = [
	{
		name:"Canyon's Death", 
		image:'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
		description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in metus tortor. Quisque urna arcu, molestie eget quam eget, hendrerit consequat mauris. Suspendisse nec varius magna. Mauris sit amet sollicitudin risus, id egestas libero. Praesent congue commodo orci, vel tempus odio varius vel. Praesent in dolor eu enim malesuada suscipit a at sem. Aenean at dui imperdiet, mollis ante convallis, mattis nisi. Mauris at ligula vel metus imperdiet commodo.'
	},
	{
		name:'Rocky IV', 
		image:'https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg',
		description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in metus tortor. Quisque urna arcu, molestie eget quam eget, hendrerit consequat mauris. Suspendisse nec varius magna. Mauris sit amet sollicitudin risus, id egestas libero. Praesent congue commodo orci, vel tempus odio varius vel. Praesent in dolor eu enim malesuada suscipit a at sem. Aenean at dui imperdiet, mollis ante convallis, mattis nisi. Mauris at ligula vel metus imperdiet commodo.'
	},
	{
		name:'Jumanji', 
		image:'https://farm4.staticflickr.com/3069/2618662727_4603c3a203.jpg',
		description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in metus tortor. Quisque urna arcu, molestie eget quam eget, hendrerit consequat mauris. Suspendisse nec varius magna. Mauris sit amet sollicitudin risus, id egestas libero. Praesent congue commodo orci, vel tempus odio varius vel. Praesent in dolor eu enim malesuada suscipit a at sem. Aenean at dui imperdiet, mollis ante convallis, mattis nisi. Mauris at ligula vel metus imperdiet commodo.'
	}

];

function seedDB() {
	// Comment.remove({},function(err){
	// 	if(err){
	// 		console.log(err);
	// 	} else {
	// 		console.log('comments removed too');
	// 	}
	// });

	Campground.remove({},function(err){
		// if(err){
		// 	console.log(err);
		// } else {
		// 	console.log('contents removed!');
		// 	// add campgrounds
		// 	data.forEach(function(seed){
		// 		Campground.create(seed, function(err,campground){
		// 			if(err){
		// 				console.log(err);
		// 			} else {
		// 				console.log('added campground');
		// 				//create a comment
		// 				Comment.create({
		// 					text:'this place is great',
		// 					author:'homer'
		// 				},function(err,comment){
		// 					if(err){
		// 						console.log(err);
		// 					} else {
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log('created new comment');
		// 					}
		// 				});
		// 			}
		// 		});
		// 	});
		// } //end of else
	});


	
}

module.exports = seedDB;