/**
 * Created by gward on 2/1/16.
 */

AUTOMORPHISM_UTILS = {
    /* NOT YET VALIDATED
    findAllAutomorphisms : function ( G ) {
        var v = G.length;

        var allAutomorphisms = [];

        function generateAutomorphismGiven(qecA, qecB, automorph, aaa, bbb){
            if (aaa !== undefined){
                subdivideEquivalenceClassesBasedOnNewLink(aaa, bbb);
            }

            function automorphismIsIncomplete(){
                return (automorph.length < G.length);
            }

            function qecSizeError(){
                if (qecA.length !== qecB.length){
                    return true;
                }
                for (var i = 0; i < qecA.length; i++){
                    if (qecA[i].length !== qecB[i].length){
                        return true;
                    }
                }
                return false;
            }

            function subdivideEquivalenceClassesBasedOnNewLink(a, b){

                function subdivideEquivalenceClassBasedOnNewLink(index){
                    var aClass = qecA[index];
                    var adjacentA = [];
                    var nonAdjacentA = [];
                    for (var i = 0; i < aClass.length; i++){
                        if (G[a][aClass[i]]){
                            adjacentA.push(aClass[i]);
                        } else {
                            nonAdjacentA.push(aClass[i]);
                        }
                    }

                    if (adjacentA.length > 0 && nonAdjacentA.length > 0){
                        qecA[index] = adjacentA;
                        qecA.push(nonAdjacentA);
                    }

                    var bClass = qecA[index];
                    var adjacentB = [];
                    var nonAdjacentB = [];
                    for (i = 0; i < bClass.length; i++){
                        if (G[b][bClass[i]]){
                            adjacentB.push(bClass[i]);
                        } else {
                            nonAdjacentB.push(bClass[i]);
                        }
                    }

                    if (adjacentB.length > 0 && nonAdjacentB.length > 0){
                        qecB[index] = adjacentB;
                        qecB.push(nonAdjacentB);
                    }
                }

                var idx = 0;

                while (idx < qecA.length){
                    if (qecA[idx].indexOf(a) != -1){
                        var i = qecA[idx].indexOf(a);
                        qecA[idx].splice(i,1);
                    }
                    if (qecB[idx].indexOf(b) != -1){
                        i = qecA[idx].indexOf(b);
                        qecB[idx].splice(i,1);
                    }
                    subdivideEquivalenceClassBasedOnNewLink(idx);
                    if (qecSizeError()){
                        return null;
                    }
                    idx++;
                }



            }

            function assignAllKnowns(){
                var idx = 0;
                while (idx < qecA.length) {
                    if (qecA[idx].length === 1) {
                        if (automorph[qecA[idx][0]] === undefined) {
                            var a = qecA[idx][0];
                            var b = qecB[idx][0];
                            automorph[a] = b;
                            subdivideEquivalenceClassesBasedOnNewLink(a, b);
                            idx = 0;
                        }
                    }
                    idx++;
                }
            }

            function makeRandomAssignment(){
                var idx = 0;
                while (idx < qecA.length){
                    if (qecA[idx].length >= 2){
                        var a = qecA[idx][0];
                        var nBs = qecB[idx].length;

                        if (automorph[a] === undefined){
                            for(var newB = 0; newB < nBs; newB++){
                                var b = qecB[idx][newB];
                                var modAutomorph = JSON.parse(JSON.stringify(automorph));
                                modAutomorph[a] = b;
                                var modQecA = JSON.parse(JSON.stringify(qecA));
                                var modQecB = JSON.parse(JSON.stringify(qecB));
                                generateAutomorphismGiven(modQecA, modQecB, modAutomorph, a, b);
                            }
                            return;
                        }
                    }
                }
            }

            while (automorphismIsIncomplete()){
                if (qecSizeError()){
                    return null;
                }
                assignAllKnowns();
                makeRandomAssignment();
            }

            allAutomorphisms.push(automorph);
        }

        var QECA = this.findQuaziEquivalenceClasses(G);
        var QECB = this.findQuaziEquivalenceClasses(G);
        var AUTOM = {};

        generateAutomorphismGiven(QECA, QECB, AUTOM);

        return allAutomorphisms;
    },
    */

    createAllPossibleCannonicalPermutationsFromEquivalenceClasses : function (qec) {

        function rangeList(start, end){
            var result = [];
            for (var i = start; i < end; i++){
                result.push(i);
            }
            return result;
        }


        function createAllPermsForSet(s1, s2, result){
            if (s1.length === 1){
                result[s1[0]] = s2[0];
                return [result];
            }
            var allResults = [];
            var a = s1[0];
            s1.splice(0,1);
            for (var i = 0; i < s2.length; i++){
                var clonedResult = JSON.parse(JSON.stringify(result));
                clonedResult[a] = s2[i];
                var clonedS2 = JSON.parse(JSON.stringify(s2));
                clonedS2.splice(i, 1);
                var clonedS1 = JSON.parse(JSON.stringify(s1));
                var aResult = createAllPermsForSet(clonedS1, clonedS2, clonedResult);
                allResults = aResult.concat(allResults);
            }
            return allResults;
        }

        var qecPerms = [];

        var index = 0;
        for (var i = 0; i < qec.length; i++){
            var s1 = qec[i];
            var s2 = rangeList(index, index + s1.length);
            index += s1.length;
            qecPerms.push(createAllPermsForSet(s1, s2, {}));
        }

        var allPerms = [{}];

        while (qecPerms.length > 0){
            var qecPerm = qecPerms[0];
            qecPerms.splice(0,1);

            var newAllPerms = [];
            for (i = 0; i < allPerms.length; i++){
                for (var j = 0; j < qecPerm.length; j++){
                    var temp = JSON.parse(JSON.stringify(allPerms[i]));
                    for (var attr in qecPerm[j]) { temp[attr] = qecPerm[j][attr]; }
                    newAllPerms.push(temp)
                }
            }

            allPerms = newAllPerms;
        }
        
        return allPerms;
    },

    findQuaziEquivalenceClasses : function ( G ){

        function compareVectors(a, b){
            for (var i = 0; i < a.length; i++){
                if (a[i] > b[i]){
                    return 1;
                } else if (a[i] < b[i]) {
                    return -1;
                }
            }
            return 0;
        }

        var dict = {};
        var paths = GRAPH_INVARIANTS.paths(G);
        var order = [];

        for (var i = 0; i < G.length; i++){
            dict[i] = paths[i];
            order.push(i);
        }

        var madeSwap = true;
        while (madeSwap){
            madeSwap = false;
            for (i = 1; i < order.length; i++){
                if (compareVectors(dict[order[i-1]], dict[order[i]]) === 1){
                    var temp = order[i];
                    order[i] = order[i-1];
                    order[i-1] = temp;
                    madeSwap = true;
                }
            }
        }

        var classes = [];
        var currClass = [order[0]];
        for (i = 1; i < order.length; i++){
            if (compareVectors(dict[order[i-1]], dict[order[i]]) === 0){
                currClass.push(order[i]);
            } else {
                classes.push(currClass);
                currClass = [];
                currClass.push(order[i]);
            }
        }
        classes.push(currClass);

        return classes;
    }
};
