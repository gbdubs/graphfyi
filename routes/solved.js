var express = require('express');
var router = express.Router();

var index = 0;

var results = [];

router.post('/', function(req, res, next) {

	var graph6String = req.body.graph6String;
	var functionId = req.body.functionId;
	var result = req.body['result[]'];

	saveResult(functionId, graph6String, result);
	
	res.send(JSON.stringify({
		'saved': true
	}));
});

// Placeholder for a DB... for now...
function saveResult(functionId, graph6String, result){
	results.push({
		'functionId': functionId,
		'graph6String': graph6String,
		'result': result
	});
}

module.exports = router;
