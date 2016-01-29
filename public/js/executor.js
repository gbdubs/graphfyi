/**
 * Created by gward on 1/27/16.
 */

EXECUTIVE = {
    LOCAL_MODE : true,

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
    
    FUNCTIONS : {},

    running : false,
    nProblemsAssigned : 0,
    maxProblems : 2,

    start : function () {
        this.running = true;
        var ex = this;
        console.log("Started Execution");
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
        console.log("Halted Execution");
        this.running = false;
    },

    execute : function () {
        console.log("Starting New Problem. ["+this.nProblemsAssigned+"] currently running.");
        this.nProblemsAssigned++;
        var executor = this;
        this.getProblem(function (data) {
            var result = executor.calculate(data.functionId, data.graph6String);
            executor.sendResponse(data.url,
            {
                'functionId': data.functionId,
                'graph6String': data.graph6String,
                'result': result
            }, function () {
                executor.nProblemsAssigned--;
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
                console.log("Get Problem Data: " + data + "\nStatus: " + status);
                callback(JSON.parse(data));
            }
        );
    },

    sendResponse : function(url, data, callback){
        $.post(
            url,
            data,
            function(data, status){
                console.log("Send Response Data: " + data + "\nStatus: " + status);
                callback();
            }
        );
    },

    calculate : function(functionId, graphString){
        var fun = this.getFunction(functionId);
        var graph = GRAPH_UTILS.graph6Decode(graphString);
        return fun(graph);
    },

    getFunction : function(functionId) {
        if (this.FUNCTIONS[functionId] == undefined){
            var functionBody = this.downloadFunction(functionId);
            // TODO : var checksum = this.downloadChecksum(functionId);
            // TODO : this.verifyFunctionWithChecksum(functionBody, checksum);
            this.unpackFunction(functionId, functionBody);
        }
        return this.FUNCTIONS[functionId];
    },

    downloadFunction : function(functionId){
        return 'function( A ) {\n'+
        '   var size = A.length;\n'+
        '   var result = [];\n'+
        '   for (var temp = 0; temp < A.length; temp++){\n'+
        '       var total = 0;\n'+
        '       for (var temp2 = 0; temp2 < A[temp].length; temp2++){\n'+
        '           total = total + A[temp][temp2];\n'+
        '       }\n'+
        '       result.push(total);\n'+
        '   }\n'+
        '   return result;\n'+
        '}';
    },

    downloadChecksum : function(functionId){
        return STRING_UTILS.hashCode(functionId);
    },

    verifyFunctionWithChecksum : function(functionBody, checksumValue){
        if (STRING_UTILS.hashCode(functionBody) != checksumValue){
            throw new Error("UNTRUSTED CODE DETECTED!!! ["+functionBody+"] does not match checksum ["+checksumValue+"]");
        }
    },

    unpackFunction : function (functionId, functionBody){
        this.FUNCTIONS[functionId] = eval("var TEMPFUN = function(){ return "+functionBody+"; }; TEMPFUN();");
    }
};
