/**
 * Created by gward on 1/27/16.
 */

EXECUTIVE = {
    REQUEST_URL : 'http://www.graph.fyi/problem',
    SOLVED_URL : 'http://www.graph.fyi/solved',
    
    FUNCTIONS : {},

    running : false,
    nProblemsAssigned : 0,
    maxProblems : 10,

    run : function () {
        while (this.running){
            if (nProblemsAssigned < maxProblems){
                this.execute();
            }
        }
    },

    stop : function () {
        this.running = false;
    },

    execute : function () {
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
        callback({
            'url': this.SOLVED_URL,
            'graph6String': '902384s',
            'functionId': '203984'
        });
    },

    sendResponse : function(url, data, callback){
        $.post(url,
            data,
            function(data, status){
                console.log("Data: " + data + "\nStatus: " + status);
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
            var checksum = this.downloadChecksum(functionId);
            this.verifyFunctionWithChecksum(functionBody, checksum);
            this.unpackFunction(functionId, functionBody);
        }
        return this.FUNCTIONS[functionId];
    },

    downloadFunction : function(functionId){
        return 'function(a, b) { console.log('+functionId+'); return a + b; }'
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
        this.FUNCTIONS[functionId] = eval("var TEMPFUN = function(){ return "+functionBody+"; } TEMPFUN();");
    }
};
