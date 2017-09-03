var redis = require("redis");
var client = redis.createClient();

client.setSync = Meteor.wrapAsync(client.set);
client.getSync = Meteor.wrapAsync(client.get);

module.exports = client;