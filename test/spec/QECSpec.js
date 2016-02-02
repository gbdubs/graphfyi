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