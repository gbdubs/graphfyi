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
});
