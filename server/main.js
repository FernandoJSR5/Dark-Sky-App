import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // 
  var Forecast = Npm.require('forecast');

  var forecast = new Forecast({
	  service: 'darksky.net',
	  key: "0a0e00db47758f7d2eda998da6085024",
	  units: 'celcius',
	  cache: true,
	  ttl: {
	    minutes: 5
	  }
	});

// Retrieve weather information using coordinates (Sydney, Australia)
	forecast.get([-33.4726900, -70.6472400], function (err, result) {
	  /*if (err) {
	    return console.dir(err);
  	}*/
  	if (Math.random(0, 1) < 0.1){
  		throw new Meteor.Error('How unfortunate! The API Request Failed');
			console.log('How unfortunate! The API Request Failed');
		}
	  console.log('Latitude: %s', result.latitude);
	  console.log('Longitude: %s', result.longitude);
	  console.log('Timezone: %s', result.timezone);
	  console.log('hourly: %s', result.hourly.summary);
	  console.log();
	  console.log('Current Weather Conditions:');
	  console.log();
	  console.log(' %s, %s°C, %s% humidity',
    result.currently.summary, Math.round(parseFloat(result.currently.temperature, 10)), result.currently.humidity * 100);
	});
});
