/**
 * Created by gward on,1/27/16.
 */


describe("QEC Generator", function () {

    it("should be able to find the quazi equivalence classes for a large, symmetric graph 1", function () {

        var expectedEncoding = 'I?r@`aiXg';

        var graph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        var qec = AUTOMORPHISM_UTILS.findQuaziEquivalenceClasses(graph);

        var expected = [
            [3, 7],
            [0, 1, 4, 5],
            [2, 6],
            [8, 9]
        ];

        expect(expected).toEqual(qec);

    });

    it("should be able to find the quazi equivalence classes for a large, symmetric graph 2", function () {

        var expectedEncoding = 'ICpbdh]n?';

        var graph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        var qec = AUTOMORPHISM_UTILS.findQuaziEquivalenceClasses(graph);

        var expected = [
            [4],[2],[6],[7],[0],[1],[5],[3],[9],[8]
        ];

        expect(expected).toEqual(qec);

    });
});


describe("Cannonical Permutation Generator", function () {

    it("should be able to calcualte the correct number of permutations given the qecs 1", function (){
        var expectedEncoding = 'I?r@`aiXg';

        var graph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        var qec = AUTOMORPHISM_UTILS.findQuaziEquivalenceClasses(graph);

        var perms = AUTOMORPHISM_UTILS.createAllPossibleCannonicalPermutationsFromEquivalenceClasses(qec);

        expect(perms.length).toEqual(2 * 24 * 2 * 2);
    });

    it("should be able to calcualte the correct number of permutations given the qecs 2", function (){
        var expectedEncoding = 'ICpbdh]n?';

        var graph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        var qec = AUTOMORPHISM_UTILS.findQuaziEquivalenceClasses(graph);

        var perms = AUTOMORPHISM_UTILS.createAllPossibleCannonicalPermutationsFromEquivalenceClasses(qec);

        expect(perms.length).toEqual(1);
    });
});

describe("Cannonical Graph Converter", function () {
    it(" works 1", function (){
        var originalEncoding = 'I?r@`aiXg';
        var cannonicalEncoding = GRAPH_UTILS.graphEncodingToCannonicalForm(originalEncoding);
        expect('I`G[ACrBw').toEqual(cannonicalEncoding);
    });

    it(" is stable 1", function (){
        var originalEncoding = 'I`G[ACrBw';
        var cannonicalEncoding = GRAPH_UTILS.graphEncodingToCannonicalForm(originalEncoding);
        expect(originalEncoding).toEqual(cannonicalEncoding);
    });

    it("correctly converts all valid (well ordered) graphs to the one true king [large]", function (){
        var allPerms = ["I_KqCCjDw","I_KsACjDw","I_KqCCfEw","I_KsACfEw","I`CiCCrBw","I`CkACrBw","I`CiCCfEw","I`CkACfEw","I`GYCCrBw","I`G[ACrBw","I`GYCCjDw","I`G[ACjDw","I_KqCCZHw","I_KsACZHw","I_KqCCVIw","I_KsACVIw","I`GYCCrBw","I`G[ACrBw","I`GYCCVIw","I`G[ACVIw","I`CiCCrBw","I`CkACrBw","I`CiCCZHw","I`CkACZHw","I`CiCCZHw","I`CkACZHw","I`CiCCNKw","I`CkACNKw","I`GYCCjDw","I`G[ACjDw","I`GYCCNKw","I`G[ACNKw","I_KqCCjDw","I_KsACjDw","I_KqCCZHw","I_KsACZHw","I`GYCCVIw","I`G[ACVIw","I`GYCCNKw","I`G[ACNKw","I`CiCCfEw","I`CkACfEw","I`CiCCNKw","I`CkACNKw","I_KqCCfEw","I_KsACfEw","I_KqCCVIw","I_KsACVIw","I_KsACjDw","I_KqCCjDw","I_KsACfEw","I_KqCCfEw","I`CkACrBw","I`CiCCrBw","I`CkACfEw","I`CiCCfEw","I`G[ACrBw","I`GYCCrBw","I`G[ACjDw","I`GYCCjDw","I_KsACZHw","I_KqCCZHw","I_KsACVIw","I_KqCCVIw","I`G[ACrBw","I`GYCCrBw","I`G[ACVIw","I`GYCCVIw","I`CkACrBw","I`CiCCrBw","I`CkACZHw","I`CiCCZHw","I`CkACZHw","I`CiCCZHw","I`CkACNKw","I`CiCCNKw","I`G[ACjDw","I`GYCCjDw","I`G[ACNKw","I`GYCCNKw","I_KsACjDw","I_KqCCjDw","I_KsACZHw","I_KqCCZHw","I`G[ACVIw","I`GYCCVIw","I`G[ACNKw","I`GYCCNKw","I`CkACfEw","I`CiCCfEw","I`CkACNKw","I`CiCCNKw","I_KsACfEw","I_KqCCfEw","I_KsACVIw","I_KqCCVIw","I_KqCCVIw","I_KsACVIw","I_KqCCZHw","I_KsACZHw","I`CiCCNKw","I`CkACNKw","I`CiCCZHw","I`CkACZHw","I`GYCCNKw","I`G[ACNKw","I`GYCCVIw","I`G[ACVIw","I_KqCCfEw","I_KsACfEw","I_KqCCjDw","I_KsACjDw","I`GYCCNKw","I`G[ACNKw","I`GYCCjDw","I`G[ACjDw","I`CiCCNKw","I`CkACNKw","I`CiCCfEw","I`CkACfEw","I`CiCCfEw","I`CkACfEw","I`CiCCrBw","I`CkACrBw","I`GYCCVIw","I`G[ACVIw","I`GYCCrBw","I`G[ACrBw","I_KqCCVIw","I_KsACVIw","I_KqCCfEw","I_KsACfEw","I`GYCCjDw","I`G[ACjDw","I`GYCCrBw","I`G[ACrBw","I`CiCCZHw","I`CkACZHw","I`CiCCrBw","I`CkACrBw","I_KqCCZHw","I_KsACZHw","I_KqCCjDw","I_KsACjDw","I_KsACVIw","I_KqCCVIw","I_KsACZHw","I_KqCCZHw","I`CkACNKw","I`CiCCNKw","I`CkACZHw","I`CiCCZHw","I`G[ACNKw","I`GYCCNKw","I`G[ACVIw","I`GYCCVIw","I_KsACfEw","I_KqCCfEw","I_KsACjDw","I_KqCCjDw","I`G[ACNKw","I`GYCCNKw","I`G[ACjDw","I`GYCCjDw","I`CkACNKw","I`CiCCNKw","I`CkACfEw","I`CiCCfEw","I`CkACfEw","I`CiCCfEw","I`CkACrBw","I`CiCCrBw","I`G[ACVIw","I`GYCCVIw","I`G[ACrBw","I`GYCCrBw","I_KsACVIw","I_KqCCVIw","I_KsACfEw","I_KqCCfEw","I`G[ACjDw","I`GYCCjDw","I`G[ACrBw","I`GYCCrBw","I`CkACZHw","I`CiCCZHw","I`CkACrBw","I`CiCCrBw","I_KsACZHw","I_KqCCZHw","I_KsACjDw","I_KqCCjDw"];

        var cannon = GRAPH_UTILS.graphEncodingToCannonicalForm(allPerms[0]);

        for (var i = 0; i < allPerms.length; i++){
            var encoding = GRAPH_UTILS.graphEncodingToCannonicalForm(allPerms[i]);
            expect(encoding).toEqual(cannon);
            // console.log("SUCCESS " + (i+1) + '/' + allPerms.length);
        }
    });

    it("works for 100 random permutations of random v7e12 graph", function (){
        //var originalEncoding = GRAPH_UTILS.graph6Encode(GRAPH_UTILS.randomGraph(7, 12)); Expected 'FkIZw' to equal 'FsUvO'.
        var originalEncoding = 'FsUvO';
        var A = GRAPH_UTILS.graph6Decode(originalEncoding);
        var cannon = GRAPH_UTILS.graphEncodingToCannonicalForm(originalEncoding);

        for (var trial = 0; trial < 100; trial++){
            var perm = MATRIX_UTILS.randomPermutation(7);
            var B = MATRIX_UTILS.permute(A, perm);
            var C = GRAPH_UTILS.graphToCannonicalForm(B);
            expect(GRAPH_UTILS.graph6Encode(C)).toEqual(cannon);
        }
    });

    it("works for 1 random permutation of random v10e20 graph", function (){
        var originalEncoding = GRAPH_UTILS.graph6Encode(GRAPH_UTILS.randomGraph(10, 20));

        var A = GRAPH_UTILS.graph6Decode(originalEncoding);
        var cannon = GRAPH_UTILS.graphEncodingToCannonicalForm(originalEncoding);

        for (var trial = 0; trial < 1; trial++){
            var perm = MATRIX_UTILS.randomPermutation(10);
            var B = MATRIX_UTILS.permute(A, perm);
            var C = GRAPH_UTILS.graphToCannonicalForm(B);
            expect(GRAPH_UTILS.graph6Encode(C)).toEqual(cannon);
        }
    });
});
