var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SlackMessages = mongoose.model('SlackLogger');

router.route('/messages').get(function(req, res) {
	SlackMessages.find(function(err, messages){
    	if(err){ 
    		return next(err); 
    	}
		res.json(messages);
  	});
});

module.exports = router;
