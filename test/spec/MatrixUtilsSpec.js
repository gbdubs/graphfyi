/**
 * Created by gward on,1/27/16.
 */


describe("Matrix Utilities", function () {

    it("should correctly multiply simple matrices", function () {

        var A = [
            [-2, -1, 5],
            [4, 3, -3],
            [6, 2, 7]
        ];

        var B = [
            [8, -2],
            [0, 4],
            [1, 6]
        ];

        var expected = [
            [-11, 30],
            [29, -14],
            [55, 38]
        ];

        var C = MATRIX_UTILS.multiply(A, B);

        expect(C).toEqual(expected);
    });

});