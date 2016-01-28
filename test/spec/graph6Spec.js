/**
 * Created by gward on,1/27/16.
 */


describe("Graph6", function () {

    it("should be able to ENCODE an arbitrary graph", function () {

        var expectedGraph = [
            [0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 0]
        ];

        var expectedEncoding = 'G?qffs';

        var actualEncoding = GRAPH_UTILS.graph6Encode(expectedGraph);

        expect(expectedEncoding).toEqual(actualEncoding);
    });

    it("should be able to DECODE an arbitrary graph", function () {

        var expectedGraph = [
            [0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 0]
        ];

        var expectedEncoding = 'G?qffs';

        var actualGraph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        expect(actualGraph).toEqual(expectedGraph);
    });

    it("should be able to ENCODE an arbitrary LARGE graph", function () {

        var expectedGraph = [
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0]
        ];

        var expectedEncoding = 'KCQeJP\\}@{UW';

        var actualEncoding = GRAPH_UTILS.graph6Encode(expectedGraph);

        expect(expectedEncoding).toEqual(actualEncoding);
    });

    it("should be able to DECODE an arbitrary LARGE graph", function () {

        var expectedGraph = [
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0]
        ];

        var expectedEncoding = 'KCQeJP\\}@{UW';

        var actualGraph = GRAPH_UTILS.graph6Decode(expectedEncoding);

        expect(actualGraph).toEqual(expectedGraph);
    });

    for (var i = 6; i <= 20; i++) {
        it("should be able to Encode and Decode 100 random graphs of size " + i, function () {
            for (var j = 0; j < 100; j++) {
                var expectedGraph = GRAPH_UTILS.randomGraph(i);

                var encoding = GRAPH_UTILS.graph6Encode(expectedGraph)

                var actualGraph = GRAPH_UTILS.graph6Decode(encoding);

                expect(actualGraph).toEqual(expectedGraph);
            }
        });
    }
});

describe("Random Graph Generator", function () {
    it("should be able to create valid undirected, non-loop graphs of any size and vertex/edge count", function () {
        for (var v = 1; v < 40; v += Math.ceil(3 * Math.random())) {
            for (var e = 0; e <= (v * (v - 1)) / 2; e += Math.ceil(v * Math.random())) {
                var A = GRAPH_UTILS.randomGraph(v, e);

                // Tests that the RGG creates a graph with the correct number of vertices.
                expect(A.length).toEqual(v);
                for (var k = 0; k < v; k++) {
                    expect(A[k].length).toEqual(v);
                }

                var sum1 = 0;
                var sum2 = 0;
                for (var i = 0; i < v; i++) {
                    for (var j = 0; j < v; j++) {
                        sum1 += A[i][j];
                        sum2 += A[j][i];
                        // Test for symmetry of the matrix.
                        expect(sum1).toEqual(sum2);

                        // Tests zeros along the diagonal of the matrix
                        if (i == j) {
                            expect(A[i][j]).toEqual(0);
                        }
                    }
                }

                // Tests the number of edges in the
                expect(sum1).toEqual(2 * e);
            }
        }
    });
});