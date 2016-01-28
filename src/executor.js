/**
 * Created by gward on 1/27/16.
 */

EXECUTIVE = {
    REQUEST_URL : 'http://www.graph.fyi/problem',
    SOLVED_URL : 'http://www.graph.fyi/solved',
    
    FUNCTIONS : {},

    running : false,

    execute : function (){
        this.running = true;
        while (this.running){
            var problem = this.getProblem();
            var result = this.calculate(problem.functionId, problem.graph6String);
            this.sendResponse(problem.url, problem.functionId, problem.graph6String, result);
        }
    },

    getProblem : function (){
        return {
            url: this.SOLVED_URL,
            graph6String: '902384s',
            functionId: '203984'
        }
    },

    sendResponse : function(url, functionId, graphString, result){

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
