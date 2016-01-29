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

    FUNCTION_URL : function () {
        if (this.LOCAL_MODE)
            return 'http://localhost:3000/function';
        else
            return 'http://www.graph.fyi/function'
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
            executor.calculate(data.functionId, data.graph6String, function (result) {
                if (result || result === 0){
                    executor.sendResponse(
                        data.url,
                        {
                            'functionId': data.functionId,
                            'graph6String': data.graph6String,
                            'result': result
                        }, 
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
                console.log("Send Response Data Returned: " + data + "\nStatus: " + status);
                callback();
            }
        );
    },

    calculate : function(functionId, graphString, callback){
        var graph = GRAPH_UTILS.graph6Decode(graphString);
        this.getFunction(functionId, function (fun){
            if (fun){
                callback(fun(graph));
            }
        });
    },

    getFunction : function(functionId, callback) {
        if (this.FUNCTIONS[functionId] == undefined){
            var functionBody = this.downloadFunction(functionId, function (functionResponse){
                var functionBody = functionResponse.body;
                if (!functionBody){
                    console.log("Function with function id ["+functionId+"] could not be retrieved by the server.");
                    return null;
                }
                EXECUTIVE.unpackFunction(functionId, functionBody);
                callback(EXECUTIVE.FUNCTIONS[functionId]);
            });
            // TODO : var checksum = this.downloadChecksum(functionId);
            // TODO : this.verifyFunctionWithChecksum(functionBody, checksum);
        }
        callback(this.FUNCTIONS[functionId]);
    },

    downloadFunction : function(functionId, callback){
        $.get(
            EXECUTIVE.FUNCTION_URL(),
            {"functionId" : functionId},
            function (data, status){
                callback(JSON.parse(data));
            }
        );
    },
/*
    downloadChecksum : function(functionId){
        return STRING_UTILS.hashCode(functionId);
    },

    verifyFunctionWithChecksum : function(functionBody, checksumValue){
        if (STRING_UTILS.hashCode(functionBody) != checksumValue){
            throw new Error("UNTRUSTED CODE DETECTED!!! ["+functionBody+"] does not match checksum ["+checksumValue+"]");
        }
    },*/

    unpackFunction : function (functionId, functionBody){
        this.FUNCTIONS[functionId] = eval("var TEMPFUN = function(){ return "+functionBody+"; }; TEMPFUN();");
    }
};
