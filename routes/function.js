var express = require('express');
var router = express.Router();

var index = 0;

var results = {};

router.get('/', function(req, res, next) {
	var functionId = req.query.functionId;
	console.log("FUNCITONID REQUESTED " + functionId);
	if (functionId == 'degrees'){
		res.send(JSON.stringify({
			'found': true,
			'functionId': functionId,
			'body': supportedFunctions['degrees']
		}));
	} else {
		res.send(JSON.stringify({'found': false}));
	}
});

module.exports = router;

var supportedFunctions = {
	'degrees' : ''+
		'function ( G ) {\n'+
			'var d = new Array(G.length);\n'+
			'for(var i = 0; i < G.length; i++){\n'+
			'	var temp = 0;\n'+
			'	for(var j = 0; j < G[i].length; j++){\n'+
			'		temp += G[i][j];\n'+
			'	}\n'+
			'	d[i] = temp;\n'+
			'}\n'+
			'd.sort(function(a,b){return a - b});\n'+
			'return d;\n'+
		'}',
	'errorprone':''+
		'function ( G ) {\n'+
			'var str = "asdfasdf";\n'+
			'return str.charCodeAt(122);\n'+
		'}',
	'paths':''+
		'function ( G ) {\n'+
			'console.log("not yet supported");\n'+
		'}'
};