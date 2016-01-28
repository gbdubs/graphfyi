GRAPH_UTILS = {

    graph6Encode : function ( A ) {
        var v = A.length;
        var e = (v * (v-1))/2;
        var nChars = Math.ceil((e - 1) / 6) + 1;

        var i = 0;
        var j = 0;

        var chars = String.fromCharCode(63 + v);

        var charNum = 1;
        while (i < v && j < v && charNum < nChars){
            var running = 0;
            for (var bitCount = 0; bitCount < 6; bitCount++){
                if (i == j){
                    j = 0;
                    i = i + 1;
                }
                running = running << 1;
                if (i < v && j < v){
                    running = running | (A[i][j]);
                }
                j++;
            }
            var c = String.fromCharCode(running + 63);
            chars = chars + c;
            charNum++;
        }
        return chars;
    },

    graph6Decode : function ( s ) {
        var n = s.charCodeAt(0) - 63;
        var e = n * (n - 1) / 2;

        var toAddSize = 6;

        var graph = MATRIX_UTILS.zeros(n, n);

        var count = 0;
        var index = 1;
        var x = 1;
        var y = 0;
        while (count < e){
            var c = s.charCodeAt(index) - 63;
            var toAdd = new Array(toAddSize);
            var i;
            for(i = toAddSize-1; i >= 0; i--){
                toAdd[i] = c % 2;
                c = c >> 1;
            }
            for (i = 0; i < toAddSize; i++){
                if (x == y){
                    graph[x][y] = 0;
                    x++;
                    y = 0;
                    if (x == n){
                        return graph;
                    }
                }
                graph[x][y] = toAdd[i];
                graph[y][x] = toAdd[i];
                count++;
                y++;
            }
            index++;
        }
        return graph;
    },

    randomGraph : function ( v, e ){
        if (e == undefined){
            e = Math.ceil(Math.random() * v * (v - 1) / 2);
        }
        var A = MATRIX_UTILS.zeros(v, v);
        while (e > 0){
            var i = 1;
            var j = 0;
            while (A[i][j] == 1 || i == j){
                i = Math.floor( Math.random() * v);
                j = Math.floor( Math.random() * v);
            }
            A[i][j] = 1;
            A[j][i] = 1;
            e--;
        }
        return A;
    }
};

MATRIX_UTILS = {

    d1 : function ( A ){
        return A.length;
    },

    d2 : function ( A ){
        if (A.length == 0){
            return 0;
        }
        return A[0].length;
    },

    zeros : function(d1, d2) {
        var arr = new Array(d1), i, l;
        for(i = 0; i < d1; i++) {
            arr[i] = new Array(d2);
            for (var j = 0; j < d2; j++){
                arr[i][j] = 0;
            }
        }
        return arr;
    },

    identity : function (d1){
        var A = zeros(d1, d1);
        for (var i = 0; i < d1; i++){
            A[i][i] = 1;
        }
        return A;
    },

    multiply : function ( A, B ) {
        var d1 = MATRIX_UTILS.d1;
        var d2 = MATRIX_UTILS.d2;

        if (d2(A) != d1(B)){
            throw new Error('What the hell! You gave me a ['+d1(A)+'x'+d2(A)+'] to multiply by ['+d1(B)+'x'+d2(B)+']!');
        }

        var C = MATRIX_UTILS.zeros(d1(A), d2(B));
        for (var i = 0; i < d1(A); i++){
            for (var j = 0; j < d2(B); j++) {
                var total = 0;
                for (var k = 0; k < d2(A); k++){
                    total += A[i][k] * B[k][j];
                }
                C[i][j] = total;
            }
        }

        return C;
    },

    transpose : function ( A ) {
        var d1 = MATRIX_UTILS.d1(A);
        var d2 = MATRIX_UTILS.d2(A);

        var B = MATRIX_UTILS.zeros(d2, d1);

        for (var i = 0; i < d1; i++){
            for (var j = 0; j < d2; j++) {
                B[j][i] = A[i][j];
            }
        }

        return B;
    },

    random : function (d1, d2, max) {
        if (max == undefined){
            max = 1;
        }
        var A = MATRIX_UTILS.zeros(d1, d2);
        for (var i = 0; i < d1; i++){
            for (var j = 0; j < d2; j++){
                A[i][j] = Math.random() * max;
            }
        }
        return A;
    }
};

GRAPH_INVARIANTS = {

    degrees : function ( G ) {

        var d = new Array(G.length);

        for(var i = 0; i < G.length; i++){
            var temp = 0;
            for(var j = 0; j < G[i].length; j++){
                temp += G[i][j];
            }
            d[i] = temp;
        }

        d.sort(function(a,b){return a - b});

        return d;
    },

    diameter : function ( G ) {

        // PASS

    },

    eigenvalues : function ( G ) {

        // PASS

    },

    paths : function ( G ) {

        // PASS

    },

    angleMatrix : function ( G ) {

        // PASS

    }
};

STRING_UTILS = {
    hashCode : function(str) {
        var hash = 0, i, chr, len;
        if (str.length === 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}