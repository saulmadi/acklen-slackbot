var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SlackMessages = mongoose.model('SlackMessage');

/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
//});


router.route('/messages').get(function(req, res) {
	SlackMessages.find(function(err, messages){
    	if(err){ 
    		return next(err); 
    	}
		res.json(messages);
  	});
});

module.exports = router;
