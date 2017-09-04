import { Meteor } from 'meteor/meteor';

var client = require("./redis");

var Forecast = Npm.require('forecast');

var forecast = new Forecast({
  service: 'darksky.net',
  key: '0a0e00db47758f7d2eda998da6085024',
  units: 'celcius',
  cache: true,      // Cache API requests 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
  }
});

Meteor.methods({
  setRedis: function(key, value) {
    return client.setSync(key, JSON.stringify(value))
  },
  getRedis: function(key) {

    var future = new Future();

    var coordenates = JSON.parse(client.getSync(key));

    forecast.get(coordenates, function(err, weather) {
      
      if(err) return console.dir(err);
      
      if (Math.random(0, 1) < 0.1) throw new Meteor.Error('How unfortunate! The API Request Failed');

      darkskyObj = {timezone: weather.timezone, temperature: weather.currently.temperature, hourly: weather.hourly.summary, daily: weather.daily.summary}

      future["return"](JSON.stringify(darkskyObj));

    });
    return future.wait();
  }
});