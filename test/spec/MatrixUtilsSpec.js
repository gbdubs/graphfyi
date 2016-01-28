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

    it("should be able to do transforms, random creation and multiplication, 20 times", function (){

        for(var iteration = 0; iteration < 20; iteration++) {
            var d1 = Math.ceil(Math.random() * 20);
            var d2 = Math.ceil(Math.random() * 20);
            var d3 = Math.ceil(Math.random() * 20);

            var A = MATRIX_UTILS.random(d1, d2);
            var B = MATRIX_UTILS.random(d2, d3);

            var CPrime = MATRIX_UTILS.transpose(MATRIX_UTILS.multiply(A, B));
            var PrimeC = MATRIX_UTILS.multiply(MATRIX_UTILS.transpose(B), MATRIX_UTILS.transpose(A));

            expect(CPrime).toEqual(PrimeC);
        }
    });

    it("should validate for all possible dimension mismatches", function() {
        var d1 = 10;
        var d2 = 20;
        var d3 = 1

        var A = MATRIX_UTILS.random(d2, d1);
        var B = MATRIX_UTILS.random(d2, d3);

        expect(function(){MATRIX_UTILS.multiply(A, B)}).toThrowError(Error);
        expect(function(){MATRIX_UTILS.multiply(B, A)}).toThrowError(Error);

        A = MATRIX_UTILS.random(d2, d1);
        B = MATRIX_UTILS.random(d3, d2);

        expect(function(){MATRIX_UTILS.multiply(A, B)}).toThrowError(Error);
        expect(function(){MATRIX_UTILS.multiply(B, A)}).not.toThrowError(Error);

        A = MATRIX_UTILS.random(d1, d2);
        B = MATRIX_UTILS.random(d2, d3);

        expect(function(){MATRIX_UTILS.multiply(B, A)}).toThrowError(Error);
        expect(function(){MATRIX_UTILS.multiply(A, B)}).not.toThrowError(Error);
    });

});