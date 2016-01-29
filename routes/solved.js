var express = require('express');
var router = express.Router();

var index = 0;

var results = {};

router.post('/', function(req, res, next) {

  var graph = req.body.graph6String;
  var functionId = req.body.functionId;
  var result = req.body['result[]'];

  console.log("GRAPH : " + graph);
  console.log("RESULT : " + result);
  
  results[graph] = result;
  console.log(JSON.stringify(results, null, 2));
  
  res.send(JSON.stringify({
  	'success': true,
  	'saved': true
  }));
});

module.exports = router;
