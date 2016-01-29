/**
 * Created by gward on 1/27/16.
 */

EXECUTIVE = {
	LOCAL_MODE : true,

	FUNCTIONS : {},

	running : false,
	nProblemsAssigned : 0,
	maxProblems : 2,

	start : function () {
		this.running = true;
		var ex = this;
		console.log("STATUS : Started Execution");
		var interval = setInterval(function (){
			if (!ex.running){
				clearInterval(interval);
			}
			if (ex.nProblemsAssigned < ex.maxProblems){
				ex.execute();
			}
		}, 1000);
	},

	stop : function () {
		console.log("STATUS : Halted Execution");
		this.running = false;
	},

	execute : function () {
		console.log("Starting New Problem. ["+this.nProblemsAssigned+"] currently running.");
		this.nProblemsAssigned++;
		var executor = this;

		// Get a problem definition to wrangle with.
		this.getProblem(function (data) {
			// Once you have a problem, you should calculate over that problem.
			executor.calculate(data.functionId, data.graph6String, function (result) {
				// Once you have a result, you should send it to the server.
				if (result || result === 0){
					executor.sendResponse(
						data.url,
						{
							'functionId': data.functionId,
							'graph6String': data.graph6String,
							'result': result
						}, 
						// Once you have sent it to the server, you should indicate that
						// you are now free to do more work.
						function () {
							executor.nProblemsAssigned--;
						}
					);
				}
			});   
		});
	},

	getProblem : function (callback){
		var url = this.REQUEST_URL();
		console.log("Requesting Problem From Url ["+url+"]");
		$.get(
			url,
			{},
			function(data, status){
				if (status == 'success'){
					callback(JSON.parse(data));
				} else {
					console.log("ERR : The problem definition could not be retrieved.");
				}
			}
		);
	},

	sendResponse : function(url, data, callback){
		$.post(
			url,
			data,
			function(data, status){
				if (status == 'success'){
					callback();
				} else {
					console.log("ERR : The result of the calculation was not sent to the server.");
				}
			}
		);
	},

	calculate : function(functionId, graphString, callback){
		var graph = GRAPH_UTILS.graph6Decode(graphString);
		this.getFunction(functionId, function (fun){
			if (fun){
				var result = fun(graph);
				if (!result && result !== 0){
					console.log("ERR : The calculation did not recieve a valid result.")
				} else {
					callback(result);
				}
			}
		});
	},

	getFunction : function(functionId, callback) {
		if (this.FUNCTIONS[functionId] == undefined){
			var functionBody = this.downloadFunction(functionId, function (functionResponse){
				var functionBody = functionResponse.body;
				if (!functionBody){
					console.log("ERR : Function with functionId ["+functionId+"] was not found on the server.");
					return;
				}
				EXECUTIVE.unpackFunction(functionId, functionBody);
				callback(EXECUTIVE.FUNCTIONS[functionId]);
			});
		}
		callback(this.FUNCTIONS[functionId]);
	},

	downloadFunction : function(functionId, callback){
		$.get(
			EXECUTIVE.FUNCTION_URL(),
			{"functionId" : functionId},
			function (data, status){
				if (status == 'success'){
					callback(JSON.parse(data));
				} else {
					console.log("ERR : Function with id ["+functionId+"] could not be downloaded.")
				}
			}
		);
	},

	unpackFunction : function (functionId, functionBody){
		this.FUNCTIONS[functionId] = eval(""+
		"   var TEMPFUN = function(){\n"+
		"		return function ( A ) {\n"+
		"			try {\n"+
		"				var userFn = "+functionBody+";\n"+
		"				return userFn(A);\n"+
		"			} catch(err) {\n"+
		"				console.log('ERR : Function with Id ["+functionId+"] produced an error.');\n"+
		"			}\n"+
		"		}\n"+
		"	};\n"+
		"	TEMPFUN();\n"
		);
	},

	REQUEST_URL : function () {
		if (this.LOCAL_MODE)
			return 'http://localhost:3000/problem';
		else 
			return 'http://www.graph.fyi/problem';
	},

	SOLVED_URL : function () {
		if (this.LOCAL_MODE)
			return 'http://localhost:3000/solved';
		else
			return 'http://www.graph.fyi/solved'
	},

	FUNCTION_URL : function () {
		if (this.LOCAL_MODE)
			return 'http://localhost:3000/function';
		else
			return 'http://www.graph.fyi/function'
	}
};
