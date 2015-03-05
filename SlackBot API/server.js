var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;

var app = express();

mongoose.connect('mongodb://localhost/SlackToWebSite');

var SlackLoggerSchema = mongoose.Schema({
    ChannelName: String,
    Author: String,
    SlackMessage: String,
    DateTime: Date
});

var logger = restful.model('SlackLogger', SlackLoggerSchema);
logger.methods(['get', 'put', 'post', 'delete']);
logger.register(app, '/api/SlackLogger');

app.listen(3000);
console.log('SlackLogger is running succesfully at port 3000');