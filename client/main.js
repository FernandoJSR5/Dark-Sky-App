import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import './main.html';

Template.weather.onCreated( () => {
  Template.instance().uploading = new ReactiveVar(false);
});


Template.weather.onRendered(function(){
  $(document).ready(function() {
    $('select').material_select();
  });
});

Template.weather.helpers({
  uploading() {
    return Template.instance().uploading.get();
  },
  timeZone() {
    return Session.get('timezone');
  },
  temperature() {
    return Session.get('temperature');
  },
  hourly() {
    return Session.get('hourly');
  },
  daily() {
    return Session.get('daily');
  },
})


Template.weather.events({
  'change select': function(event, template) {
    event.preventDefault();
    var key = event.target.value;
    var timeStamp = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    template.uploading.set(true);
    Meteor.call("getRedis", key, (err, resp) => {
      if (err) {
        Meteor.call("setRedis", timeStamp, err);
        console.log(timeStamp);
        template.uploading.set(false);
        Session.set('timezone', "");
        Session.set('temperature', "");
        Session.set('hourly', "");
        Session.set('daily', "");
        Materialize.toast('How unfortunate! The API Request Failed, try again!', 3000, 'red rounded');
      }
      else {
        value = JSON.parse(resp);
        console.log(value);
        template.uploading.set(false);
        Session.set('timezone', value.timezone);
        Session.set('temperature', value.temperature + "°C");
        Session.set('hourly', value.hourly);
        Session.set('daily', value.daily);
      }
    });
  },
});