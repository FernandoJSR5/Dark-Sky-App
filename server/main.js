import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Future = Npm.require('fibers/future');
  var redis = require("redis");
	var client = redis.createClient();

	client.setSync = Meteor.wrapAsync(client.set);

	client.on("error", function(err) {
	  console.log("REDIS ERROR", err);
	});

	client.on("connect", function() {
	  console.log("connected");
	});


	let iterable = [
		{city: 'Santiago', coordinates : [-33.4726900, -70.6472400 ]},
		{city: 'London', coordinates : [51.5085300, -0.1257400]},
		{city: 'Sydney', coordinates : [-33.8683, 151.2086]},
		{city: 'Zurich', coordinates : [47.3666700, 8.5500000]},
		{city: 'Auckland', coordinates : [-36.8666700, 174.7666700]},
		{city: 'Georgia', coordinates : [33.7490000, -84.3879800]},
		]

	Object.keys(iterable).forEach( key => {
		client.setSync(iterable[key].city, JSON.stringify(iterable[key].coordinates), redis.print);
	}); 

});